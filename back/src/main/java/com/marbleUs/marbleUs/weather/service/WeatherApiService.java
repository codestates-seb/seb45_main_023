package com.marbleUs.marbleUs.weather.service;

import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.weather.entity.Weather;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class WeatherApiService {

    private final WeatherService weatherService;
    private final CityService cityService;

    private static final String API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

    @Getter
    @Value("${api.key}")
    private String SERVICE_KEY;
    private static final String PAGE_NO = "1";          //페이지 번호
    private static final String NUM_OF_ROWS = "260";    //한 페이지 결과 수
    private static final String DATA_TYPE = "JSON";     //데이터 타입
    private static final String HOUR = "0200";          //조회하기 시작할 시간

    public Double rainProbability = null;  //강수확률
    public Double maxTemp = null;          //최고기온
    public Double minTemp = null;          //최저기온


    //Weather Api 이용해 새 날씨 정보 받아와서 저장하거나 업데이트 하기
    public void saveNewWeather(){
        LocalDateTime now = LocalDateTime.now(); //데이터 조회 날짜와 시간
        String hourStr = makeHourStr();
        String yyyyMMdd = makeYYYYMMDD(now);

        try {
            //city 개수만큼 반복
            for (int cityId = 1; cityId <= cityService.cityCount(); cityId++) {

                City city = cityService.findVerifiedCity((long) cityId);
                String cityName = city.getName();
                String nx = city.getNx();
                String ny = city.getNy();


                //URL 만들기
                StringBuilder urlBuilder = makeURL(yyyyMMdd, nx, ny);

                //GET으로 요청 보내서 데이터 받기
                String result = null;
                try {
                    result = getData(urlBuilder);
                }
                catch (IOException e) {
                    log.error("데이터를 받아오는 과정에 에러가 발생했습니다.");
                }

                //받아온 값을 JSON 파싱하기
                Weather weather = jsonParsing(cityName, result, hourStr);

                if (weatherService.weatherCount() == cityService.cityCount()) {
                    String lastUpdateDate = makeYYYYMMDD(weatherService.findVerifiedWeather(1L).getDate());
                    log.info("지난 업데이트 날짜 : {}", lastUpdateDate);
                    log.info("현재 날짜 : {}", yyyyMMdd);
                    //weather 업데이트
                    weatherService.updateWeather(weather, (long) cityId);
                    log.info("날씨가 업데이트 되었습니다.");
                }
                else {
                    //weather 새로 저장
                    weatherService.postWeather(weather, (long) cityId);
                    log.info("날씨 정보가 새로 생성되었습니다.");
                }
            }
        } catch (NumberFormatException e) {
            log.error("유효하지 않은 날짜입니다.");
        }
    }



    //URL에 사용 가능한 형태로 시간 바꾸기
    public String makeHourStr() {

        LocalDateTime now = LocalDateTime.now();
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

        return hourStr;
    }

    //URL에 사용 가능한 형태로 날짜 바꾸기
    public String makeYYYYMMDD(LocalDateTime localDateTime) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String yyyyMMdd = localDateTime.format(formatter);

        return yyyyMMdd;
    }

    public StringBuilder makeURL(String yyyyMMdd, String nx, String ny) {
        StringBuilder urlBuilder = new StringBuilder(API_URL);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", StandardCharsets.UTF_8) + "=" + SERVICE_KEY);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(PAGE_NO, StandardCharsets.UTF_8));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(NUM_OF_ROWS, StandardCharsets.UTF_8));
        urlBuilder.append("&" + URLEncoder.encode("dataType", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(DATA_TYPE, StandardCharsets.UTF_8));
        urlBuilder.append("&" + URLEncoder.encode("base_date", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(yyyyMMdd, StandardCharsets.UTF_8));
        urlBuilder.append("&" + URLEncoder.encode("base_time", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(HOUR, StandardCharsets.UTF_8));
        urlBuilder.append("&" + URLEncoder.encode("nx", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(nx, StandardCharsets.UTF_8));
        urlBuilder.append("&" + URLEncoder.encode("ny", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(ny, StandardCharsets.UTF_8));

        return urlBuilder;
    }

    public String getData(StringBuilder urlBuilder) throws IOException {
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod(HttpMethod.GET.toString());
        conn.setRequestProperty("Content-type", MediaType.APPLICATION_JSON_VALUE);

        //응답 확인
        log.info("Response code: {}", conn.getResponseCode());

        //응답 데이터 읽기
        BufferedReader reader = null;
        String result = null;

        try {
            if (conn.getResponseCode() >= HttpStatus.OK.value() && conn.getResponseCode() <= HttpStatus.MULTIPLE_CHOICES.value()) {
                reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                reader = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }

            //응답 데이터를 문자열로 변환
            StringBuilder strBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                strBuilder.append(line);
            }

            //연결 종료
            conn.disconnect();
            result = strBuilder.toString();

        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    log.error("BufferedReader를 닫던 중 에러가 발생했습니다.");
                }
            }
        }
        return result;
    }

    public Weather jsonParsing(String cityName, String result, String hourStr) {

        try {
            log.info("JSON Parsing 시작");
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

                    switch (category) {
                        case "TMN": //최저기온
                            minTemp = fcstValue;
                            break;
                        case "TMX": //최고기온
                            maxTemp = fcstValue;
                            break;
                    }

                    // fcstTime과 category가 모두 원하는 값인 경우 강수 확률 읽어와서 저장
                    if (targetFcstTime.equals(fcstTime) && targetCategory.equals(category)) {
                        rainProbability = fcstValue;
                    }


                } catch (NumberFormatException e) {
                    continue;
                }
            }
        } catch (ParseException e) {
            log.error("json parsing 중 에러가 발생했습니다.");
        }

        Weather weather = new Weather(cityName, rainProbability, maxTemp, minTemp, LocalDateTime.now());
        return weather;
    }

}
