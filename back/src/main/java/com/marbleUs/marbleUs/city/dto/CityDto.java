package com.marbleUs.marbleUs.city.dto;

import com.marbleUs.marbleUs.mission.entity.CityMission;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

import java.util.List;

@Getter
@Setter
public class CityDto {
    @Getter
    @Setter
    public static class Post{
        private String name;
        private String engName;
        private String description;
        private String img;
        private String nx;
        private String ny;

    }
    @Getter
    @Setter
    public static class Patch{
        private String description;
        private String img;
        private String nx;
        private String ny;

    }
    @Getter
    @Setter
    public static class Response{

        private String name;
        private String engName;
        private String description;
        private String img;
        private String nx;
        private String ny;

        private List<CityMission> Missions;
//
//        private List<SpecialMission> specialMissions;

    }
}
