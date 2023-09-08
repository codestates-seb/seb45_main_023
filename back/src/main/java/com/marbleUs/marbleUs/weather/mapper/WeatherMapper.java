package com.marbleUs.marbleUs.weather.mapper;

import com.marbleUs.marbleUs.weather.dto.WeatherPatchDto;
import com.marbleUs.marbleUs.weather.dto.WeatherPostDto;
import com.marbleUs.marbleUs.weather.dto.WeatherResponseDto;
import com.marbleUs.marbleUs.weather.entity.Weather;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WeatherMapper {
    Weather toWeather(WeatherPostDto weatherPostDto);
    Weather toWeather(WeatherPatchDto weatherPatchDto);
    WeatherResponseDto toWeatherResponseDto(Weather weather);
}
