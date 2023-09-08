package com.marbleUs.marbleUs.mission.entity;

import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import com.marbleUs.marbleUs.member.entity.Member;

import lombok.Getter;

import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Mission extends Auditable {


    @Column(length = 100, nullable = false)
    private String content; //미션 내용

    //공통 시티미션은 여러 회원에 속할 수 있다.
    @OneToMany(mappedBy = "mission")
    private List<MemberMission> memberMissions = new ArrayList<>();

    //city_mission 테이블과 연결
    @OneToMany(mappedBy = "mission")
    private List<CityMission> cityMissions;

    //미션타입 - common, special
    @Enumerated(EnumType.STRING) //이넘타입
    @Column(length = 10, nullable = false)
    private MissionType missionType;

    public enum MissionType {
        COMMON,
        SPECIAL
    }


}
