package com.marbleUs.marbleUs.mission.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class MemberMissionCityMappedResponse {

    private String cityName;
    private List<MemberMissionResponse> memberMissions;
}
