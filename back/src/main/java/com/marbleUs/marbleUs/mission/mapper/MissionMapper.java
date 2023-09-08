package com.marbleUs.marbleUs.mission.mapper;

import com.marbleUs.marbleUs.mission.dto.MissionDto;
import com.marbleUs.marbleUs.mission.entity.Mission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MissionMapper {
    Mission postToMission(MissionDto.MissionPostDto missionPostDto);

    Mission patchToMission(MissionDto.MissionPatchDto missionPatchDto);

    MissionDto.MissionResponseDto missionToResponse(Mission mission);

//    default Mission patchToMission(MissionDto.MissionPatchDto missionPatchDto);
//    default MissionDto.Response();
//    List<MissionDto.Response> missionsToResponse(List<Mission> missions);
}
