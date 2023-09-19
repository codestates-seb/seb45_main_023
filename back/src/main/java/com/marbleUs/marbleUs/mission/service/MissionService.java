package com.marbleUs.marbleUs.mission.service;

import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.repository.CityRepository;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.service.MemberService;
import com.marbleUs.marbleUs.mission.entity.MemberMission;
import com.marbleUs.marbleUs.mission.entity.Mission;
import com.marbleUs.marbleUs.mission.repository.MemberMissionRepository;
import com.marbleUs.marbleUs.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class MissionService {
    private final MissionRepository repository;
    private final MemberMissionRepository memberMissionRepository;
    private final MemberService memberService;
    private final CityRepository cityRepository;

    //미션 생성
    public Mission create(Mission mission) {

        verifyExistsMission(mission.getContent());

        return repository.save(mission);
    }

    //미션 업데이트
    public Mission update(Mission mission, Long missionId) {
        Mission foundMission = findVerifiedMission(missionId);
        //미션 내용 업데이트
        Optional.ofNullable(mission.getContent())
                .ifPresent(content -> foundMission.setContent(content));

        return repository.save(foundMission);
    }

    @Transactional(readOnly = true)
    public Mission find(Long missionId) {

        return findVerifiedMission(missionId);
    }

    //미션 삭제
    public void deleteMission(Long missionId) {
        Mission missionToDelete = findVerifiedMission(missionId);
        repository.delete(missionToDelete);
    }

    //미션 내용이 이미 존재하는지 확인하는 메서드
    private void verifyExistsMission(String content) {
        Optional<Mission> mission = repository.findByContent(content);
        //이미 존재하는 미션 내용일 경우 예외를 발생
        if (mission.isPresent())
            throw new BusinessLogicException(ExceptionCode.MISSION_EXISTS);
    }

    //읽기 전용 트랜잭션을 사용하여 미션을 조회
    @Transactional(readOnly = true)
    public Mission findVerifiedMission(Long id) {
        //주어진 id에 해당하는 미션을 찾거나 예외를 발생
        Optional<Mission> optionalMission =
                repository.findById(id);
        Mission findMission =
                optionalMission.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MISSION_NOT_FOUND));
        return findMission;
    }

    public Mission findRandomMission() {
        Random random = new Random();
        List<Mission> level1CommonMissions = repository.findAllByLevelAndType(1, Mission.MissionType.COMMON);
        Mission mission = level1CommonMissions.get(random.nextInt(level1CommonMissions.size()));
        return mission;
    }

    public MemberMission assignMemberMissions(Long cityId, Long memberId, Long loginMember) {


//        //비로그인시 가짜 미션 발급
//
        Random random = new Random();
//        if (memberId == 0L){
//            List<Mission> level1CommonMissions = repository.findAllByLevelAndType(1, Mission.MissionType.COMMON);
//            Mission mission = level1CommonMissions.get(random.nextInt(level1CommonMissions.size()));
//            MemberMission fakeMemberMission = new MemberMission();
//            fakeMemberMission.setId(0L);
//            fakeMemberMission.setMission(mission);
//            return fakeMemberMission;
//        }

        Member member = memberService.findVerifiedMember(memberId);

        memberService.verifyIsSameMember(member,loginMember);

        City city = cityRepository.findById(cityId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CITY_NOT_FOUND));


        /*
         * Notice: create Level1Mission if the member instance's myMission List is empty
         * and there is no memberMission mapped with the member and city with level 1 mission.
         */

        if (member.getMyMissions().isEmpty() || memberMissionRepository.findByMemberAndLevelAndCity(member, 1, city) == null) {
            List<Mission> level1CommonMissions = repository.findAllByLevelAndType(1, Mission.MissionType.COMMON);
            Mission mission = level1CommonMissions.get(random.nextInt(level1CommonMissions.size()));
            MemberMission memberLevel1Mission = new MemberMission();
            memberMissionMaker(member, city, mission, memberLevel1Mission);

            return memberLevel1Mission;

        } else {

            List<MemberMission> myMissions = memberMissionRepository.findAllByMemberAndCity(member, city);

            //Notice: Mission Level & Complete checker

            boolean missionLevel1Complete = false;
            boolean isMission1alreadyMade = false;
            boolean missionLevel2Complete = false;
            boolean isMission2alreadyMade = false;
            boolean missionLevel3Complete = false;
            boolean isMission3alreadyMade = false;
            boolean isMission4alreadyMade = false;
            boolean missionLevel4Complete = false;


            for (MemberMission memberMission : myMissions) {

                //Notice: iterates to check if each mission in each level is made

                if (memberMission.getMission().getLevel() == 1) {
                    isMission1alreadyMade = true;
                } else if (memberMission.getMission().getLevel() == 2) {
                    isMission2alreadyMade = true;
                } else if (memberMission.getMission().getLevel() == 3) {
                    isMission3alreadyMade = true;
                } else if (memberMission.getMission().getLevel() == 4) {
                    isMission4alreadyMade = true;
                }

                //Notice; iterates to check if each mission is complete

                if (memberMission.getMission().getLevel() == 1 && memberMission.isComplete()) {
                    missionLevel1Complete = true;
                } else if (memberMission.getMission().getLevel() == 2 && memberMission.isComplete()) {
                    missionLevel2Complete = true;
                } else if (memberMission.getMission().getLevel() == 3 && memberMission.isComplete()) {
                    missionLevel3Complete = true;
                } else missionLevel4Complete = true;
            }
            MemberMission memberMission = MemberMissionAssigner(random, member, city, missionLevel1Complete, isMission1alreadyMade, missionLevel2Complete, isMission2alreadyMade, missionLevel3Complete, isMission3alreadyMade, isMission4alreadyMade);
            if (memberMission != null) return memberMission;
        }
        throw new BusinessLogicException(ExceptionCode.MISSION_ALREADY_ASSIGNED);
    }

    //admin만 가능

    public MemberMission completeMission(Long id) {
        MemberMission mission = memberMissionRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MISSION_NOT_FOUND));
        mission.setComplete(true);
        memberMissionRepository.save(mission);
        return mission;
    }

    public List<MemberMission> findMemberMissions(Long memberId, Long loginMember) {

        Member member = memberService.findVerifiedMember(memberId);

        memberService.verifyIsSameMember(member,loginMember);

        List<MemberMission> memberMissions = member.getMyMissions().stream().sorted(Comparator.comparing(MemberMission::getCreatedAt).reversed()).limit(3)
                .collect(Collectors.toList());

        return memberMissions;
    }

    public List<MemberMission> findMemberMissionsInCity(Long cityId, Long memberId, Long loginMember) {

        Member member = memberService.findVerifiedMember(memberId);

        memberService.verifyIsSameMember(member,loginMember);

        City city = cityRepository.findById(cityId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CITY_NOT_FOUND));

        List<MemberMission> memberMissions = member.getMyMissions().stream().filter(memberMission -> memberMission.getCity().equals(city)).sorted(Comparator.comparing(MemberMission::getCreatedAt))
                .collect(Collectors.toList());
        return memberMissions;
    }


    public List<Stamps> findStampIfMissionComplete(Long memberId, Long loginMember) {

//        City currentCity = cityRepository.findById(cityId).orElseThrow(()->new BusinessLogicException(ExceptionCode.CITY_NOT_FOUND));
        Member member = memberService.findVerifiedMember(memberId);

        memberService.verifyIsSameMember(member,loginMember);

        List<MemberMission> myMissions = member.getMyMissions().stream().filter(
                MemberMission::isComplete
        ).collect(Collectors.toList());

        List<Stamps> myStamps = new ArrayList<>();

        boolean lvl1Complete = false;
        boolean lvl2Complete = false;
        boolean lvl3Complete = false;
        boolean lvl4Complete = false;

        for (MemberMission memberMission : myMissions) {
            if (memberMission.getMission().getLevel() == 1) {
                lvl1Complete = true;
            } else if (memberMission.getMission().getLevel() == 2) {
                lvl2Complete = true;
            } else if (memberMission.getMission().getLevel() == 3) {
                lvl3Complete = true;
            } else if (memberMission.getMission().getLevel() == 4) {
                lvl4Complete = true;
            }
        }

        for (MemberMission memberMission : myMissions) {
            if (memberMission.getMission().getLevel() == 4 && lvl1Complete && lvl2Complete && lvl3Complete && lvl4Complete) {
                Stamps findStamp = Stamps.find(memberMission.getCity().getName(), 4);
                myStamps.add(findStamp);
            } else if (memberMission.getMission().getLevel() == 3 && lvl1Complete && lvl2Complete && lvl3Complete && !lvl4Complete) {
                Stamps findStamp = Stamps.find(memberMission.getCity().getName(), 3);
                myStamps.add(findStamp);
            } else if (memberMission.getMission().getLevel() == 2 && lvl1Complete && lvl2Complete && !lvl3Complete && !lvl4Complete) {
                Stamps findStamp = Stamps.find(memberMission.getCity().getName(), 2);
                myStamps.add(findStamp);
            } else if (memberMission.getMission().getLevel() == 1 && lvl1Complete && !lvl2Complete && !lvl3Complete && !lvl4Complete) {
                Stamps findStamp = Stamps.find(memberMission.getCity().getName(), 1);
                myStamps.add(findStamp);
            }
        }

        if (myStamps.isEmpty()) throw new BusinessLogicException(ExceptionCode.MISSION_NOT_COMPLETE);
        return myStamps;
    }


    //Utils


    private MemberMission MemberMissionAssigner(Random random, Member member, City city, boolean missionLevel1Complete, boolean isMission1alreadyMade, boolean missionLevel2Complete, boolean isMission2alreadyMade, boolean missionLevel3Complete, boolean isMission3alreadyMade, boolean isMission4alreadyMade) {
        if (missionLevel3Complete && missionLevel2Complete && missionLevel1Complete && !isMission4alreadyMade && isMission3alreadyMade && isMission2alreadyMade && isMission1alreadyMade) {
            List<Mission> level4SpecialMissions = repository.findAllByLevelAndTypeAndCity(4, Mission.MissionType.SPECIAL, city.getName());
            Mission mission = level4SpecialMissions.get(random.nextInt(level4SpecialMissions.size()));

            MemberMission memberLevel4Mission = new MemberMission();
            memberMissionMaker(member, city, mission, memberLevel4Mission);

            return memberLevel4Mission;


        } else if (missionLevel2Complete && missionLevel1Complete && !isMission3alreadyMade && isMission2alreadyMade && isMission1alreadyMade) {

            List<Mission> level3CommonMissions = repository.findAllByLevelAndType(3, Mission.MissionType.COMMON);

            Mission mission = level3CommonMissions.get(random.nextInt(level3CommonMissions.size()));

            MemberMission memberLevel3Mission = new MemberMission();
            memberMissionMaker(member, city, mission, memberLevel3Mission);

            return memberLevel3Mission;

        } else if (missionLevel1Complete && !isMission2alreadyMade && isMission1alreadyMade) {

            List<Mission> level2SpecialMissions = repository.findAllByLevelAndTypeAndCity(2, Mission.MissionType.SPECIAL, city.getName());
            Mission mission = level2SpecialMissions.get(random.nextInt(level2SpecialMissions.size()));

            MemberMission memberLevel2Mission = new MemberMission();
            memberMissionMaker(member, city, mission, memberLevel2Mission);

            return memberLevel2Mission;
        }
        return null;
    }

    private void memberMissionMaker(Member member, City city, Mission mission, MemberMission memberMission) {
        memberMission.setMission(mission);
        memberMission.setMember(member);
        memberMission.setCity(city);

        memberMissionRepository.save(memberMission);

        city.addMission(memberMission);

        cityRepository.save(city);

        member.addMemberMissions(memberMission);

        memberService.saveMember(member);
    }


}



