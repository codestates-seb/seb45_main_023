package com.marbleUs.marbleUs.mission.controller;

import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.common.argumentresolver.LoginMemberId;
import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.mission.dto.MissionDto;
import com.marbleUs.marbleUs.mission.dto.StampMultiContainer;
import com.marbleUs.marbleUs.mission.dto.StampResponse;
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
    @PostMapping("/{member-id}/{city-id}")
    public ResponseEntity assignMemberMission(@Positive @PathVariable("city-id") Long cityId,
                                              @LoginMemberId Long loginMember,
                                              @PathVariable("member-id") Long memberId) {

        MemberMission memberMission = service.assignMemberMissions(cityId,memberId,loginMember);

//        if (memberMission.getId() == 0L) return new ResponseEntity<>(mapper.missionToResponse(memberMission.getMission()),HttpStatus.CREATED);

        return new ResponseEntity<>(mapper.memberMissionToResponse(memberMission), HttpStatus.CREATED);
    }

    @PatchMapping("/mission-complete/{member-mission-id}")
    public ResponseEntity setCompleteMission(@Positive @PathVariable("member-mission-id") Long id) {
        MemberMission memberMission = service.completeMission(id);

        return new ResponseEntity<>(mapper.memberMissionToResponse(memberMission), HttpStatus.CREATED);
    }

    //마이페이지용
    @GetMapping("/member-mission/{member-id}")
    public ResponseEntity getMemberMissions(@PathVariable("member-id") Long memberId,
                                            @LoginMemberId Long loginMember){
        List<MemberMission> memberMission = service.findMemberMissions(memberId,loginMember);

        return new ResponseEntity<>(mapper.memberMissionsToResponses(memberMission), HttpStatus.OK);

    }

    //게임판용
    @GetMapping("/{member-id}/{city-id}")
    public ResponseEntity getMemberMissionsForCity(@Positive @PathVariable("city-id") Long cityId,
                                                   @LoginMemberId Long loginMember,
                                                   @Positive @PathVariable("member-id") Long memberId) {

        List<MemberMission> memberMissions = service.findMemberMissionsInCity(cityId,memberId,loginMember);
        return new ResponseEntity<>(mapper.memberMissionsToResponses(memberMissions), HttpStatus.OK);
    }

    @GetMapping("/stamps/{member-id}")
    public ResponseEntity getStamps(@LoginMemberId Long loginMember,
                                    @Positive @PathVariable("member-id") Long memberId){

        List<Stamps> stamps = service.findStampIfMissionComplete(memberId,loginMember);

        StampMultiContainer container = mapper.stampsToMultiContainer(stamps);

        return new ResponseEntity<>(mapper.stampMultiContainerToMultiResponse(container),HttpStatus.OK);
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

    //래덤 미션 정보 조회
    @GetMapping("/random")
    public ResponseEntity getRandomMission(){
        Mission mission = service.findRandomMission();
        return new ResponseEntity<>(mapper.missionToResponse(mission), HttpStatus.OK);
    }

    //특정 미션 삭제
    @DeleteMapping("/{mission-id}")
    public ResponseEntity deleteMission(@PathVariable("mission-id") Long missionId){
        service.deleteMission(missionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
