package com.marbleUs.marbleUs.mission.mapper;

import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.mission.dto.MemberMissionCityMappedResponse;
import com.marbleUs.marbleUs.mission.dto.MemberMissionResponse;
import com.marbleUs.marbleUs.mission.dto.MissionDto;
import com.marbleUs.marbleUs.mission.dto.StampResponse;
import com.marbleUs.marbleUs.mission.entity.MemberMission;
import com.marbleUs.marbleUs.mission.entity.Mission;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MissionMapper {
    Mission postToMission(MissionDto.MissionPostDto missionPostDto);


    Mission patchToMission(MissionDto.MissionPatchDto missionPatchDto);

    MissionDto.MissionResponseDto missionToResponse(Mission mission);

    default MemberMissionResponse memberMissionToResponse(MemberMission memberMission){
        MemberMissionResponse memberMissionResponse = new MemberMissionResponse();
        memberMissionResponse.setId(memberMission.getId());
        memberMissionResponse.setLevel(memberMission.getMission().getLevel());
        memberMissionResponse.setMemberId(memberMission.getMember().getId());
        memberMissionResponse.setContent(memberMission.getMission().getContent());
        memberMissionResponse.setCityName(memberMission.getCity().getName());
        memberMissionResponse.setMissionType(memberMission.getMission().getMissionType());
        memberMissionResponse.setIsComplete(String.valueOf(memberMission.isComplete()));
        return memberMissionResponse;
    };

    List<MemberMissionResponse> memberMissionsToResponses(List<MemberMission> memberMissions);

//    default MemberMissionCityMappedResponse toFinalResponse(List<MemberMission> memberMissions){
//        MemberMissionCityMappedResponse response = new MemberMissionCityMappedResponse();
//        response.setCityName(cityName);
//        List<MemberMissionResponse> memberMissionResponses = memberMissions.stream().map(memberMission -> {
//            MemberMissionResponse memberMissionResponse= memberMissionToResponse(memberMission);
//            return memberMissionResponse;
//        }).collect(Collectors.toList());
//        response.setMemberMissions(memberMissionResponses);
//
//        return response;
//    }

    default StampResponse stampToResponse(Stamps stamp){
        StampResponse response = new StampResponse();
        response.setCity(stamp.getCityName());
        response.setStamp(stamp.getImgPath());
        response.setLevel(stamp.getLevel());
        return response;
    }
    default List<StampResponse> stampsToResponses(List<Stamps> stamps){
        List<StampResponse> responses = stamps.stream().map(stamp ->stampToResponse(stamp)
        ).collect(Collectors.toList());

        return responses;
    }
}
