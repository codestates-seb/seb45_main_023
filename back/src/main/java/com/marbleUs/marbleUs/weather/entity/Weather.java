package com.marbleUs.marbleUs.weather.entity;

import com.marbleUs.marbleUs.city.entity.City;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "weather")
public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String region;

    @Column(nullable = false)
    private Double rainProbability;

    @Column(nullable = false)
    private Double maxTemp;

    @Column(nullable = false)
    private Double minTemp;

    @Column(nullable = false)
    private LocalDateTime date;

    public Weather(String region, Double rainProbability, Double maxTemp, Double minTemp, LocalDateTime date) {
        this.region = region;
        this.date = date;
        this.rainProbability = rainProbability;
        this.maxTemp = maxTemp;
        this.minTemp = minTemp;
    }

    @OneToOne
    private City city;




}
