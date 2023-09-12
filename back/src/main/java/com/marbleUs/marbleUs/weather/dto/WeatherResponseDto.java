package com.marbleUs.marbleUs.weather.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class WeatherResponseDto {
    private Long id;
    private String region;
    private int rainProbability;
    private int maxTemp;
    private int minTemp;
    private LocalDateTime date;
}
