package com.marbleUs.marbleUs.blog.repository;

import com.marbleUs.marbleUs.blog.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog,Long> {
    Optional<Blog> findById(Long blogId);
    List<Blog> findByTagsContaining(String tag);
    List<Blog> findByMemberId(Long memberId);
    List<Blog> findByCityId(Long cityId);
    //Optional<Blog> findByMemberId(long blogId);

}
