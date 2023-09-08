package com.marbleUs.marbleUs.mission.mapper;

import com.marbleUs.marbleUs.mission.dto.MissionDto;
import com.marbleUs.marbleUs.mission.entity.Mission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MissionMapper {
    default Mission postToMission(MissionDto.MissionPostDto missionPostDto) {
        if ( missionPostDto == null ) {
            return null;
        }

        Mission mission = new Mission();

        mission.setContent( missionPostDto.getContent() );
        Mission.MissionType missionType = missionPostDto.getMissionType();
        mission.setMissionType(missionType);

        return mission;
    }


    Mission patchToMission(MissionDto.MissionPatchDto missionPatchDto);

    MissionDto.MissionResponseDto missionToResponse(Mission mission);

//    default Mission patchToMission(MissionDto.MissionPatchDto missionPatchDto);
//    default MissionDto.Response();
//    List<MissionDto.Response> missionsToResponse(List<Mission> missions);
}
