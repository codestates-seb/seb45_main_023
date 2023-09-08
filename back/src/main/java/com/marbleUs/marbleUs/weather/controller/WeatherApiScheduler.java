package com.marbleUs.marbleUs.weather.controller;


import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.weather.entity.Weather;
import com.marbleUs.marbleUs.weather.service.WeatherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static java.lang.Double.valueOf;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WeatherApiScheduler {


    private final WeatherService weatherService;
    private final CityService cityService;
    private static final String API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    @Value("${API_SERVICE_KEY}")
    private String SERVICE_KEY;
    private static final String PAGE_NO = "1";        //페이지 번호
    private static final String NUM_OF_ROWS = "260";    //한 페이지 결과 수
    private static final String DATA_TYPE = "JSON";    //데이터 타입
    private static final String HOUR = "0200"; //조회하기 시작할 시간
    public Double rainProbability = null;  //강수확률
    public Double maxTemp = null;          //최고 기온
    public Double minTemp = null;          //최저 기온
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");


    //테스트용, 2분마다 작동
    @Scheduled(cron = "0 */2 * * * *")
    public void updateWeatherAutomatically() throws IOException {

        LocalDateTime now = LocalDateTime.now(); //데이터 조회 날짜와 시간

        //DateTimeFormatter를 사용하여 LocalDateTime을 "yyyyMMdd" 형식의 문자열로 변환
        String yyyyMMdd = now.format(formatter);


        //조회 시간의 hour만 추출해서 hh00 형태로 변환 ex)1800
        String hourStr;
        if (now.getHour()>=3 && now.getHour()<10) {
            hourStr = "0" + String.valueOf(now.getHour()) + "00";
        }
        else if (now.getHour()==0|now.getHour()==1||now.getHour()==2) {
            hourStr = "0300";
        }
        else {
            hourStr = String.valueOf(now.getHour()) + "00";
        }
        log.info("조회 기준 시각 : {}", hourStr);


        //저장되어 있는 날씨가 있는 경우
        if (weatherService.weatherCount() != 0) {

            //마지막 업데이트 시간 확인
            String lastUpdateDate = weatherService.findVerifiedWeather(1L).getDate().format(formatter);
            log.info("지난 업데이트 날짜 : {}", lastUpdateDate);
            log.info("현재 날짜 : {}", yyyyMMdd);
            log.info("강수 확률 업데이트 시작");

            //현재 날짜랑 지난 업데이트 날짜가 같은 경우 -> 강수 확률만 업데이트
            if (lastUpdateDate.equals(yyyyMMdd)) {
                try {
                    //city 개수만큼 반복
                    for (int cityId = 1; cityId <= cityService.cityCount(); cityId++) {

                        City city = cityService.findVerifiedCity((long) cityId);
                        String cityName = city.getName();
                        String nx = city.getNx();
                        String ny = city.getNy();


                        //URL 만들기
                        StringBuilder urlBuilder = new StringBuilder(API_URL);
                        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", StandardCharsets.UTF_8) + "=" + SERVICE_KEY);
                        urlBuilder.append("&" + URLEncoder.encode("pageNo", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(PAGE_NO, StandardCharsets.UTF_8));
                        urlBuilder.append("&" + URLEncoder.encode("numOfRows", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(NUM_OF_ROWS, StandardCharsets.UTF_8));
                        urlBuilder.append("&" + URLEncoder.encode("dataType", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(DATA_TYPE, StandardCharsets.UTF_8));
                        urlBuilder.append("&" + URLEncoder.encode("base_date", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(yyyyMMdd, StandardCharsets.UTF_8));
                        urlBuilder.append("&" + URLEncoder.encode("base_time", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(HOUR, StandardCharsets.UTF_8));
                        urlBuilder.append("&" + URLEncoder.encode("nx", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(nx, StandardCharsets.UTF_8));
                        urlBuilder.append("&" + URLEncoder.encode("ny", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(ny, StandardCharsets.UTF_8));


                        //GET으로 요청 보내서 데이터 받기
                        URL url = new URL(urlBuilder.toString());
                        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                        conn.setRequestMethod(HttpMethod.GET.toString());
                        conn.setRequestProperty("Content-type", MediaType.APPLICATION_JSON_VALUE);

                        //응답 확인
                        log.info("Response code: {}", conn.getResponseCode());

                        //응답 데이터 읽기
                        BufferedReader rd;
                        if (conn.getResponseCode() >= HttpStatus.OK.value() && conn.getResponseCode() <= HttpStatus.MULTIPLE_CHOICES.value()) {
                            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                        } else {
                            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                        }

                        //응답 데이터를 문자열로 변환
                        StringBuilder sb = new StringBuilder();
                        String line;
                        while ((line = rd.readLine()) != null) {
                            sb.append(line);
                        }
                        rd.close();

                        //연결 종료
                        conn.disconnect();

                        String result = sb.toString();

                        //받아온 값을 JSON 파싱하기
                        try {
                            // JSON 파서 생성
                            JSONParser parser = new JSONParser();
                            // JSON 데이터를 파싱하여 JSON 객체로 변환
                            JSONObject jsonObject = (JSONObject) parser.parse(result);

                            // "response" -> "body" -> "items" -> "item" 배열 추출
                            JSONObject items = (JSONObject) jsonObject.get("response");
                            items = (JSONObject) items.get("body");
                            items = (JSONObject) items.get("items");
                            JSONArray itemList = (JSONArray) items.get("item");


                            for (Object item : itemList) {
                                try {
                                    JSONObject itemObject = (JSONObject) item;
                                    String category = (String) itemObject.get("category");
                                    Double fcstValue = Double.parseDouble((String) itemObject.get("fcstValue"));
                                    String fcstTime = (String) itemObject.get("fcstTime");
                                    String targetFcstTime = hourStr;
                                    String targetCategory = "POP";


                                    // fcstTime과 category가 모두 원하는 값인 경우 강수 확률 읽어와서 저장
                                    if (targetFcstTime.equals(fcstTime) && targetCategory.equals(category)) {
                                        rainProbability = fcstValue;
                                    }
                                    break; // 루프 종료

                                } catch (NumberFormatException e) {
                                    continue;
                                }
                            }
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                        //업데이트 하려는 weather 조회
                        Weather findWeather = weatherService.findWeatherByCity((long) cityId);

                        //강수 확률만 바꾼 weather 객체 생성
                        Weather weather = new Weather(cityName, rainProbability, findWeather.getMaxTemp(), findWeather.getMinTemp(), LocalDateTime.now());

                        //weather 업데이트
                        weatherService.updateWeather(weather, (long) cityId);
                        log.info("강수 확률이 업데이트 되었습니다.");
                    }
                } catch (NumberFormatException e) {
                    log.error("유효하지 않은 날짜입니다.");
                }
            }

            //현재 날짜랑 지난 업데이트 날짜가 다른 경우 -> 날씨 정보 전체 업데이트
            else {
                log.info("날씨 정보 업데이트 시작");
                for (int cityId = 1; cityId <= cityService.cityCount(); cityId++) {

                    City city = cityService.findVerifiedCity((long) cityId);
                    String cityName = city.getName();
                    String nx = city.getNx();
                    String ny = city.getNy();


                    //URL 만들기
                    StringBuilder urlBuilder = new StringBuilder(API_URL);
                    urlBuilder.append("?" + URLEncoder.encode("ServiceKey", StandardCharsets.UTF_8) + "=" + SERVICE_KEY);
                    urlBuilder.append("&" + URLEncoder.encode("pageNo", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(PAGE_NO, StandardCharsets.UTF_8));
                    urlBuilder.append("&" + URLEncoder.encode("numOfRows", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(NUM_OF_ROWS, StandardCharsets.UTF_8));
                    urlBuilder.append("&" + URLEncoder.encode("dataType", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(DATA_TYPE, StandardCharsets.UTF_8));
                    urlBuilder.append("&" + URLEncoder.encode("base_date", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(yyyyMMdd, StandardCharsets.UTF_8));
                    urlBuilder.append("&" + URLEncoder.encode("base_time", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(HOUR, StandardCharsets.UTF_8));
                    urlBuilder.append("&" + URLEncoder.encode("nx", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(nx, StandardCharsets.UTF_8));
                    urlBuilder.append("&" + URLEncoder.encode("ny", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(ny, StandardCharsets.UTF_8));


                    //GET으로 요청 보내서 데이터 받기
                    URL url = new URL(urlBuilder.toString());
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod(HttpMethod.GET.toString());
                    conn.setRequestProperty("Content-type", MediaType.APPLICATION_JSON_VALUE);

                    //응답 확인
                    log.info("Response code: {}", conn.getResponseCode());

                    //응답 데이터 읽기
                    BufferedReader rd;
                    if (conn.getResponseCode() >= HttpStatus.OK.value() && conn.getResponseCode() <= HttpStatus.MULTIPLE_CHOICES.value()) {
                        rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    } else {
                        rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                    }

                    //응답 데이터를 문자열로 변환
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = rd.readLine()) != null) {
                        sb.append(line);
                    }
                    rd.close();

                    //연결 종료
                    conn.disconnect();

                    String result = sb.toString();

                    //받아온 값을 JSON 파싱하기
                    try {
                        // JSON 파서 생성
                        JSONParser parser = new JSONParser();
                        // JSON 데이터를 파싱하여 JSON 객체로 변환
                        JSONObject jsonObject = (JSONObject) parser.parse(result);

                        // "response" -> "body" -> "items" -> "item" 배열 추출
                        JSONObject items = (JSONObject) jsonObject.get("response");
                        items = (JSONObject) items.get("body");
                        items = (JSONObject) items.get("items");
                        JSONArray itemList = (JSONArray) items.get("item");

                        String targetFcstTime = hourStr;
                        String targetCategory = "POP";


                        for (Object item : itemList) {
                            try {
                                JSONObject itemObject = (JSONObject) item;
                                String category = (String) itemObject.get("category");
                                Double fcstValue = Double.parseDouble((String) itemObject.get("fcstValue"));
                                String fcstTime = (String) itemObject.get("fcstTime");


                                //강수 확률은 조회한 시간에 맞춰 추출
                                if (targetFcstTime.equals(fcstTime) && targetCategory.equals(category)) {
                                    rainProbability = fcstValue;
                                }

                                switch (category) {
                                    case "TMN": //최저기온
                                        minTemp = fcstValue;
                                        break;
                                    case "TMX": //최고기온
                                        maxTemp = fcstValue;
                                        break;
                                }

                            } catch (NumberFormatException e) {
                                continue;
                            }
                        }
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }

                    //weather 객체 생성
                    Weather weather = new Weather(cityName, rainProbability, maxTemp, minTemp, LocalDateTime.now());

                    weatherService.updateWeather(weather, (long) cityId);
                    log.info("날씨 정보가 모두 업데이트 되었습니다.");



                }
            }
        } else { //날씨 정보가 전혀 없는 경우
            log.info("날씨 정보 생성 시작");
            for (int cityId = 1; cityId <= cityService.cityCount(); cityId++) {

                City city = cityService.findVerifiedCity((long) cityId);
                String cityName = city.getName();
                String nx = city.getNx();
                String ny = city.getNy();


                //URL 만들기
                StringBuilder urlBuilder = new StringBuilder(API_URL);
                urlBuilder.append("?" + URLEncoder.encode("ServiceKey", StandardCharsets.UTF_8) + "=" + SERVICE_KEY);
                urlBuilder.append("&" + URLEncoder.encode("pageNo", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(PAGE_NO, StandardCharsets.UTF_8));
                urlBuilder.append("&" + URLEncoder.encode("numOfRows", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(NUM_OF_ROWS, StandardCharsets.UTF_8));
                urlBuilder.append("&" + URLEncoder.encode("dataType", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(DATA_TYPE, StandardCharsets.UTF_8));
                urlBuilder.append("&" + URLEncoder.encode("base_date", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(yyyyMMdd, StandardCharsets.UTF_8));
                urlBuilder.append("&" + URLEncoder.encode("base_time", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(HOUR, StandardCharsets.UTF_8));
                urlBuilder.append("&" + URLEncoder.encode("nx", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(nx, StandardCharsets.UTF_8));
                urlBuilder.append("&" + URLEncoder.encode("ny", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(ny, StandardCharsets.UTF_8));


                //GET으로 요청 보내서 데이터 받기
                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod(HttpMethod.GET.toString());
                conn.setRequestProperty("Content-type", MediaType.APPLICATION_JSON_VALUE);

                //응답 확인
                log.info("Response code: {}", conn.getResponseCode());

                //응답 데이터 읽기
                BufferedReader rd;
                if (conn.getResponseCode() >= HttpStatus.OK.value() && conn.getResponseCode() <= HttpStatus.MULTIPLE_CHOICES.value()) {
                    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                } else {
                    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                }

                //응답 데이터를 문자열로 변환
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = rd.readLine()) != null) {
                    sb.append(line);
                }
                rd.close();

                //연결 종료
                conn.disconnect();

                String result = sb.toString();

                //받아온 값을 JSON 파싱하기
                try {
                    // JSON 파서 생성
                    JSONParser parser = new JSONParser();
                    // JSON 데이터를 파싱하여 JSON 객체로 변환
                    JSONObject jsonObject = (JSONObject) parser.parse(result);

                    // "response" -> "body" -> "items" -> "item" 배열 추출
                    JSONObject items = (JSONObject) jsonObject.get("response");
                    items = (JSONObject) items.get("body");
                    items = (JSONObject) items.get("items");
                    JSONArray itemList = (JSONArray) items.get("item");

                    String targetFcstTime = hourStr;
                    String targetCategory = "POP";


                    for (Object item : itemList) {
                        try {
                            JSONObject itemObject = (JSONObject) item;
                            String category = (String) itemObject.get("category");
                            Double fcstValue = Double.parseDouble((String) itemObject.get("fcstValue"));
                            String fcstTime = (String) itemObject.get("fcstTime");


                            //강수 확률은 조회한 시간에 맞춰 추출
                            if (targetFcstTime.equals(fcstTime) && targetCategory.equals(category)) {
                                rainProbability = fcstValue;
                            }

                            switch (category) {
                                case "TMN": //최저기온
                                    minTemp = fcstValue;
                                    break;
                                case "TMX": //최고기온
                                    maxTemp = fcstValue;
                                    break;
                            }

                        } catch (NumberFormatException e) {
                            continue;
                        }
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                //weather 객체 생성
                Weather weather = new Weather(cityName, rainProbability, maxTemp, minTemp, LocalDateTime.now());

                weatherService.postWeather(weather, (long) cityId);
                log.info("날씨 정보가 새로 생성되었습니다.");

            }
        }
    }

}



