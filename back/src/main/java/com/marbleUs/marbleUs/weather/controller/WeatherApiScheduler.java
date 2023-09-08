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
import java.util.List;

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
    private static final String NUM_OF_ROWS = "500";    //한 페이지 결과 수
    private static final String DATA_TYPE = "JSON";    //데이터 타입
    public Double rainProbability = null;  //강수확률
    public Double maxTemp = null;          //최고 기온
    public Double minTemp = null;          //최저 기온


    //테스트용, 2분마다 작동
    @Scheduled(cron = "0 */2 * * * *")
    public void updateWeatherAutomatically() throws IOException {


        for (int cityId = 1; cityId <= cityService.cityCount() ; cityId++) {

        LocalDateTime now = LocalDateTime.now(); //데이터 조회 날짜

            //DateTimeFormatter를 사용하여 LocalDateTime을 "yyyyMMdd" 형식의 문자열로 변환
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            String yyyyMMdd = now.format(formatter);


            String hourStr = "0200"; //조회하기 시작할 시간


            City city = cityService.findVerifiedCity((long)cityId);
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
            urlBuilder.append("&" + URLEncoder.encode("base_time", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(hourStr, StandardCharsets.UTF_8));
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

                // "category"에 따라 처리
                for (Object item : itemList) {
                    try {
                        JSONObject itemObject = (JSONObject) item;
                        String category = (String) itemObject.get("category");
                        Double fcstValue = Double.parseDouble((String) itemObject.get("fcstValue"));

                        switch (category) {
                            case "POP": //강수확률
                                rainProbability = fcstValue;
                                break;
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

            //날씨 없을 때는 생성, 있으면 업데이트
            if (weatherService.weatherCount() < cityService.cityCount()) {
                weatherService.postWeather(weather, (long) cityId);
            } else {
                weatherService.updateWeather(weather, (long) cityId);
            }

        }
    }
}






