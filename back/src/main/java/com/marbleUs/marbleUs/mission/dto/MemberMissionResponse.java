package com.marbleUs.marbleUs.mission.dto;

import com.marbleUs.marbleUs.mission.entity.Mission;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberMissionResponse {
    private long Id;
    private int level;
    private String cityName;
    private long memberId;
    private Mission.MissionType missionType;
    private String content;
    private String isComplete;
}
