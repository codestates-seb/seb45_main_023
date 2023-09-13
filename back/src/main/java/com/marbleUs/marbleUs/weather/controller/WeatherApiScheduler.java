package com.marbleUs.marbleUs.weather.controller;


import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.weather.entity.Weather;
import com.marbleUs.marbleUs.weather.service.WeatherApiService;
import com.marbleUs.marbleUs.weather.service.WeatherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WeatherApiScheduler {


    private final WeatherService weatherService;
    private final CityService cityService;
    private final WeatherApiService weatherApiService;


    //첫 실행시 1분 뒤에 작동하고 그 다음부터 3시간마다 작동
    @Scheduled(initialDelay = 60000, fixedRate = 10800000)
    public void updateWeatherAutomatically() throws IOException {

        LocalDateTime now = LocalDateTime.now(); //데이터 조회 날짜와 시간
        String hourStr = weatherApiService.makeHourStr();
        String yyyyMMdd = weatherApiService.makeYYYYMMDD(now);

        try {
            //city 개수만큼 반복
            for (int cityId = 1; cityId <= cityService.cityCount(); cityId++) {

                City city = cityService.findVerifiedCity((long) cityId);
                String cityName = city.getName();
                String nx = city.getNx();
                String ny = city.getNy();


                //URL 만들기
                StringBuilder urlBuilder = weatherApiService.makeURL(yyyyMMdd, nx, ny);

                //GET으로 요청 보내서 데이터 받기
                String result = weatherApiService.getData(urlBuilder);

                //받아온 값을 JSON 파싱하기
                Weather weather = weatherApiService.jsonParsing(cityName,result,hourStr);

                if (weatherService.weatherCount() == cityService.cityCount()) {
                    String lastUpdateDate = weatherApiService.makeYYYYMMDD(weatherService.findVerifiedWeather(1L).getDate());
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


}





