package com.marbleUs.marbleUs.weather.controller;

import com.marbleUs.marbleUs.weather.entity.Weather;
import com.marbleUs.marbleUs.weather.mapper.WeatherMapper;
import com.marbleUs.marbleUs.weather.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;
    private final WeatherMapper weatherMapper;

    @GetMapping("/{city-name}")
    public ResponseEntity getRegionWeather(@PathVariable("city-name") String cityName) {
        Weather weather = weatherService.findWeatherByCityName(cityName);
        return new ResponseEntity<>(weatherMapper.toWeatherResponseDto(weather), HttpStatus.OK);
    }


}
