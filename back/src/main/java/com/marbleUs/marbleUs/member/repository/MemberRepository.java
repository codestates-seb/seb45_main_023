package com.marbleUs.marbleUs.member.repository;

import com.marbleUs.marbleUs.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
    Member findById(long memberId);


    @Query("SELECT m FROM Member m WHERE m.lastLogin < :thresholdDate")
    List<Member> findAllByLastLogin(LocalDateTime thresholdDate);

    @Query("SELECT m from Member m WHERE m.memberStatus = :memberStatus")
    List<Member> findAllByMemberStatus(Member.Status memberStatus);
}
