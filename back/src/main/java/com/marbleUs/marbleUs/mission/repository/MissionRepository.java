package com.marbleUs.marbleUs.mission.repository;

import com.marbleUs.marbleUs.mission.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query("SELECT m FROM Mission m WHERE m.content = :content")
    Optional<Mission> findByContent(String content);

}
