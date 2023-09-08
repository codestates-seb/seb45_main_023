package com.marbleUs.marbleUs.mission.entity;

import com.marbleUs.marbleUs.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class MemberMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY ) //자동생성
    @Column(nullable = false)
    private Long id;

    //회원과 다대일
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    //미션과 다대일
    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    //클리어 여부
    @Column(nullable = false)
    private boolean isComlpete;


}
