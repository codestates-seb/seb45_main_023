package com.marbleUs.marbleUs.mission.repository;


import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.mission.entity.MemberMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberMissionRepository extends JpaRepository<MemberMission,Long> {

    @Query("SELECT mm FROM MemberMission mm WHERE mm.member = :member AND mm.mission.level = :level AND mm.city = :city")
    Object findByMemberAndLevelAndCity(Member member, int level, City city);

    @Query("SELECT mm FROM MemberMission mm WHERE mm.member = :member AND mm.city = :city")
    List<MemberMission> findAllByMemberAndCity(Member member, City city);
}
