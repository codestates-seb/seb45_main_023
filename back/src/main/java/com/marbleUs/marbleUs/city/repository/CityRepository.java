package com.marbleUs.marbleUs.city.repository;

import com.marbleUs.marbleUs.city.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface CityRepository extends JpaRepository<City, Long> {

    @Query("SELECT c FROM City c WHERE c.name = :name")
    Optional<City> findByName(String name);
}
