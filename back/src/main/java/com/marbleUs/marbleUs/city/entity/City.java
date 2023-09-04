package com.marbleUs.marbleUs.city.entity;

import com.marbleUs.marbleUs.common.BaseEntity;

import com.marbleUs.marbleUs.common.audit.Auditable;
import com.marbleUs.marbleUs.blog.entity.Blog;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
public class City extends BaseEntity implements CityEntity{


    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private String engName;

    //@Column(length = 200,nullable = false)
    private String img;

    @Column(length = 1000, nullable = false)
    private String description;

    @OneToMany(mappedBy = "city")
    private List<Blog> blogs = new ArrayList();

//    @OneToMany(mappedBy = "city")
//    private List<City_weathers> city_weathers = new ArrayList();

//    @OneToMany(mappedBy = "city")
//    private List<CityMission> cityMissions = new ArrayList();

//    @OneToMany(mappedBy = "city")
//    private List<SpecialMission> specialMissions = new ArrayList();

    @Override
    public void addCityMission() {

    }

    @Override
    public void addSpecialMission() {

    }

    @Override
    public void addBlog() {

    }
}
