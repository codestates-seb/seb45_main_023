package com.marbleUs.marbleUs.city.dto;

import lombok.Getter;
import lombok.Setter;

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

    }
    @Getter
    @Setter
    public static class Patch{
        private String description;
        private String img;

    }
    @Getter
    @Setter
    public static class Response{

        private String name;
        private String engName;
        private String description;
        private String img;

//        private List<CityMission> commonMissions;
//
//        private List<SpecialMission> specialMissions;

    }
}
