package com.marbleUs.marbleUs.mission.repository;

import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.mission.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query("SELECT m FROM Mission m WHERE m.content = :content")
    Optional<Mission> findByContent(String content);

    @Query("SELECT m from Mission m where m.level = :i AND m.missionType = :missionType")
    List<Mission> findAllByLevelAndType(int i, Mission.MissionType missionType);

    @Query("SELECT m FROM Mission m WHERE m.level =:i AND m.missionType = :missionType AND m.cityName = :cityName")
    List<Mission> findAllByLevelAndTypeAndCity(int i, Mission.MissionType missionType, String cityName);
}
