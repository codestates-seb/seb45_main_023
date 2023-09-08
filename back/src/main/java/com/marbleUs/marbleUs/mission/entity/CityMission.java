package com.marbleUs.marbleUs.mission.entity;

import com.marbleUs.marbleUs.city.entity.City;

import javax.persistence.*;

@Entity
@Table(name = "city_mission")
public enum CityMission {
    ;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //미션과 다대일
    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    //도시와 다대일
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    //미션의 레벨
    @Column(nullable = false)
    private int level;



}
