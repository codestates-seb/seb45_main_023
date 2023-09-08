package com.marbleUs.marbleUs.mission.dto;

import com.marbleUs.marbleUs.mission.entity.Mission;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MissionDto {

    @Getter
    @Setter
    public static class MissionPostDto{
        private String content;
        private Mission.MissionType missiontype;

    }

    @Getter
    @Setter
    public static class MissionPatchDto{
        private String content;
        private Mission.MissionType missiontype;
        private String createdAt;
        private String modifiedAt;
    }

    @Getter
    @Setter
    public static class MissionResponseDto{
        private String id;
        private String content;
        private Mission.MissionType missiontype;
        private String createdAt;
        private String modifiedAt;
    }

}
