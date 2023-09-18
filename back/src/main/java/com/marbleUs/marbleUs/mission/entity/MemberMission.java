package com.marbleUs.marbleUs.mission.entity;

import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.common.tools.audit.Auditable;
import com.marbleUs.marbleUs.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class MemberMission extends Auditable {

    //회원과 다대일
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    //미션과 다대일
    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    //클리어 여부
    @Column(nullable = false)
    private boolean isComplete = false;


}
