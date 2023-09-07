package com.marbleUs.marbleUs.member.repository;

import com.marbleUs.marbleUs.member.entity.Follow;
import com.marbleUs.marbleUs.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow,Long> {

    @Query("SELECT f FROM Follow f WHERE f.member = :member AND f.followedMember = :followedMember")
    Optional<Follow> findByMemberAndFollowedMember(Member member, Member followedMember);
}
