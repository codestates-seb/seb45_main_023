package com.marbleUs.marbleUs.city.entity;

import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import com.marbleUs.marbleUs.common.tools.entity.BaseEntity;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.mission.entity.MemberMission;
import com.marbleUs.marbleUs.weather.entity.Weather;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
public class City extends Auditable {


    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private String engName;

    //@Column(length = 200,nullable = false)
    private String img;

    @Column(length = 1000, nullable = false)
    private String description;

    @Column(length = 10, nullable = false)
    private String nx;

    @Column(length = 10, nullable = false)
    private String ny;


    @OneToMany(mappedBy = "city")
    private List<Blog> blogs = new ArrayList();

    @OneToOne(mappedBy = "city")
    private Weather weather;

//    @OneToMany(mappedBy = "city")
//    private List<City_weathers> city_weathers = new ArrayList();

    @OneToMany(mappedBy = "city",cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private List<MemberMission> assignedMissions = new ArrayList<>();

//    @OneToMany(mappedBy = "city")
//    private List<SpecialMission> specialMissions = new ArrayList();


    public void addMission(MemberMission mission) {
        if (!mission.getCity().equals(this)) mission.setCity(this);
        assignedMissions.add(mission);

    }



    public void addBlog() {

    }
}
