package com.marbleUs.marbleUs.weather.repository;

import com.marbleUs.marbleUs.weather.entity.Weather;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<Weather,Long> {
    Weather findByRegion(String region);
    Weather findByCityId(Long cityId);
    Weather findByCityName(String name);

}
