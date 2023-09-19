package com.marbleUs.marbleUs.image.repository;

import com.marbleUs.marbleUs.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image,Long> {

    @Query("SELECT i from Image i where i.name = :name")
    Optional<Image> findByName(String name);

    @Query("SELECT i from Image i where i.blog = null")
    List<Image> findAllByIfBlogNull();
}
