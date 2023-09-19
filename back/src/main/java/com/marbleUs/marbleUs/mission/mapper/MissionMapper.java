package com.marbleUs.marbleUs.mission.mapper;

import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.mission.dto.*;
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

    default StampMultiContainer stampsToMultiContainer(List<Stamps> stamps){
        StampMultiContainer container = new StampMultiContainer();
        for (Stamps stamp:stamps){
            if (stamp.equals(container.getStamp01())) {
                container.setStamp01(stamp);
            } else  container.setStamp01(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp02())){
                container.setStamp02(stamp);
            } else container.setStamp02(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp03())){
                container.setStamp03(stamp);
            } else container.setStamp03(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp04())){
                container.setStamp04(stamp);
            } else container.setStamp04(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp05())){
                container.setStamp05(stamp);
            } else container.setStamp05(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp06())){
                container.setStamp06(stamp);
            } else container.setStamp06(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp07())){
                container.setStamp07(stamp);
            } else container.setStamp07(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp08())){
                container.setStamp08(stamp);
            } else container.setStamp08(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp09())){
                container.setStamp09(stamp);
            } else container.setStamp09(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp10())){
                container.setStamp10(stamp);
            } else container.setStamp10(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp11())){
                container.setStamp11(stamp);
            } else container.setStamp11(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp12())){
                container.setStamp12(stamp);
            } else container.setStamp12(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp13())){
                container.setStamp13(stamp);
            } else container.setStamp13(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp14())){
                container.setStamp14(stamp);
            } else container.setStamp14(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp15())){
                container.setStamp15(stamp);
            } else container.setStamp15(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp16())){
                container.setStamp16(stamp);
            } else container.setStamp16(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp17())){
                container.setStamp17(stamp);
            } else container.setStamp17(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp18())){
                container.setStamp18(stamp);
            } else container.setStamp18(Stamps.STAMP_00_EMPTY);

            if (stamp.equals(container.getStamp19())){
                container.setStamp19(stamp);
            } container.setStamp19(Stamps.STAMP_00_EMPTY);
        }

        return container;
    }

    default StampMultiResponse stampMultiContainerToMultiResponse(StampMultiContainer container){

        StampMultiResponse multiResponse = new StampMultiResponse();
        multiResponse.setStamp01(stampToResponse(container.getStamp01()));
        multiResponse.setStamp02(stampToResponse(container.getStamp02()));
        multiResponse.setStamp03(stampToResponse(container.getStamp03()));
        multiResponse.setStamp04(stampToResponse(container.getStamp04()));
        multiResponse.setStamp05(stampToResponse(container.getStamp05()));
        multiResponse.setStamp06(stampToResponse(container.getStamp06()));
        multiResponse.setStamp07(stampToResponse(container.getStamp07()));
        multiResponse.setStamp08(stampToResponse(container.getStamp08()));
        multiResponse.setStamp09(stampToResponse(container.getStamp09()));
        multiResponse.setStamp10(stampToResponse(container.getStamp10()));
        multiResponse.setStamp11(stampToResponse(container.getStamp11()));
        multiResponse.setStamp12(stampToResponse(container.getStamp12()));
        multiResponse.setStamp13(stampToResponse(container.getStamp13()));
        multiResponse.setStamp14(stampToResponse(container.getStamp14()));
        multiResponse.setStamp15(stampToResponse(container.getStamp15()));
        multiResponse.setStamp16(stampToResponse(container.getStamp16()));
        multiResponse.setStamp17(stampToResponse(container.getStamp17()));
        multiResponse.setStamp18(stampToResponse(container.getStamp18()));
        multiResponse.setStamp19(stampToResponse(container.getStamp19()));

        return multiResponse;
    }
}
