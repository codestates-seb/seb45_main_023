package com.marbleUs.marbleUs.member.repository;

import com.marbleUs.marbleUs.member.entity.Follow;
import com.marbleUs.marbleUs.member.entity.Follower;
import com.marbleUs.marbleUs.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FollowerRepository extends JpaRepository<Follower,Long> {

    @Query("SELECT f FROM Follower f WHERE f.member = :member AND f.follower = :follower")
    Optional<Follower> findByMemberAndFollower(Member member, Member follower);
}
