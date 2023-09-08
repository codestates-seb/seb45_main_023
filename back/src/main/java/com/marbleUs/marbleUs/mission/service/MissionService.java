package com.marbleUs.marbleUs.mission.service;

import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.mission.entity.Mission;
import com.marbleUs.marbleUs.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class MissionService {
    private final MissionRepository repository;

    //미션 생성
    public Mission create(Mission mission){

        verifyExistsMission(mission.getContent());

        return repository.save(mission);
    }

    //미션 업데이트
    public Mission update(Mission mission, Long missionId){
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
    public void deleteMission(Long missionId){
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
}
