package com.marbleUs.marbleUs.weather.service;

import com.marbleUs.marbleUs.city.repository.CityRepository;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.weather.entity.Weather;
import com.marbleUs.marbleUs.weather.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WeatherService {

    private final WeatherRepository weatherRepository;
    private final CityService cityService;

    public Weather postWeather(Weather weather, Long cityId) {
        weather.setCity(cityService.findVerifiedCity(cityId));
        return weatherRepository.save(weather);
    }

    public Weather updateWeather(Weather weather, Long cityId) {
        Weather findWeather = findWeatherByCity(cityId);
        Optional.ofNullable(weather.getDate())
                .ifPresent(findWeather::setDate);
        Optional.ofNullable(weather.getMaxTemp())
                .ifPresent(findWeather::setMaxTemp);
        Optional.ofNullable(weather.getMinTemp())
                .ifPresent(findWeather::setMinTemp);
        return weatherRepository.save(findWeather);
    }

    @Transactional(readOnly = true)
    public Weather findWeatherByCity(Long cityId) {
        return weatherRepository.findByCityId(cityId);
    }

    @Transactional(readOnly = true)
    public Weather findWeatherByCityName(String cityName) {
        return weatherRepository.findByCityName(cityName);
    }

    public void deleteAllWeather() {
        weatherRepository.deleteAll();
    }

    @Transactional(readOnly = true)
    public Weather findVerifiedWeather(Long weatherId) {
        return weatherRepository.findById(weatherId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.WEATHER_NOT_FOUND));
    }

    public long weatherCount() {
        return weatherRepository.count();
    }


}
