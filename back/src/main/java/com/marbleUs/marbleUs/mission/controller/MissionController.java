package com.marbleUs.marbleUs.mission.controller;

import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.mission.dto.MissionDto;
import com.marbleUs.marbleUs.mission.entity.MemberMission;
import com.marbleUs.marbleUs.mission.entity.Mission;
import com.marbleUs.marbleUs.mission.mapper.MissionMapper;
import com.marbleUs.marbleUs.mission.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionMapper mapper;
    private final MissionService service;
    private final CityService cityService;

    //관리자 페이지용??
    //미션 생성
    @PostMapping
    public ResponseEntity postMission(@RequestBody MissionDto.MissionPostDto post) {
        Mission mission = service.create(mapper.postToMission(post));

        return new ResponseEntity<>("A mission is created!", HttpStatus.CREATED);
    }


    //MemberMission Controller
    @PostMapping("{member-id}/{city-id}")
    public ResponseEntity assignMemberMission(@Positive @PathVariable("city-id") Long cityId,
                                               @Positive @PathVariable("member-id") Long memberId) {
        MemberMission memberMission = service.assignMemberMissions(cityId,memberId);
        return new ResponseEntity<>(mapper.memberMissionToResponse(memberMission), HttpStatus.CREATED);
    }

    @PatchMapping("/mission-complete/{member-mission-id}")
    public ResponseEntity setCompleteMission(@Positive @PathVariable("member-mission-id") Long id) {
        MemberMission memberMission = service.completeMission(id);
        return new ResponseEntity<>(mapper.memberMissionToResponse(memberMission), HttpStatus.CREATED);
    }

    @GetMapping("member-mission/{member-id}")
    public ResponseEntity getMemberMissions(@Positive @PathVariable("member-id") Long memberId){
        Page<MemberMission> memberMission = service.findMemberMissions(memberId);
        return new ResponseEntity<>(mapper.memberMissionsToResponses(memberMission.getContent()), HttpStatus.OK);

    }

    @GetMapping("/{member-id}/{city-id}/stamps")
    public ResponseEntity getStamps(@Positive @PathVariable("city-id") Long cityId,
                                    @Positive @PathVariable("member-id") Long memberId){

        List<Stamps> stamps = service.findStampIfMissionComplete(memberId);
        return new ResponseEntity<>(mapper.stampsToResponses(stamps),HttpStatus.OK);
    }


    //미션 업데이트
    @PatchMapping("/{mission-id}")
    public ResponseEntity patchMission(@RequestBody MissionDto.MissionPatchDto patch,
                                       @Positive @PathVariable("mission-id") Long missionId){
        Mission mission = service.update(mapper.patchToMission(patch), missionId);

        return new ResponseEntity<>("The mission is updated", HttpStatus.OK);

    }

    //특정 미션 정보조회
    @GetMapping("/{mission-id}")
    public ResponseEntity getMission(@PathVariable("mission-id")Long missionId){
        Mission mission = service.find(missionId);

        return new ResponseEntity<>(mapper.missionToResponse(mission), HttpStatus.OK);
    }

    //특정 미션 삭제
    @DeleteMapping("/{mission-id}")
    public ResponseEntity deleteMission(@PathVariable("mission-id") Long missionId){
        service.deleteMission(missionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
