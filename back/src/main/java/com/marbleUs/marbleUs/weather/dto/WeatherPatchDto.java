package com.marbleUs.marbleUs.weather.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherPatchDto {
    private String region;
    private int rainProbability;
    private int maxTemp;
    private int minTemp;

}
