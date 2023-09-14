package com.marbleUs.marbleUs.weather.scheduler;


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

    private final WeatherApiService weatherApiService;

    //첫 실행시 1분 뒤에 작동하고 그 다음부터 3시간마다 작동
    @Scheduled(initialDelay = 60000, fixedRate = 10800000)
    public void updateWeatherAutomatically() {

        //Weather Api 이용해 새 날씨 정보 받아와서 저장하거나 업데이트 하기
        weatherApiService.saveNewWeather();

    }
}





