package com.marbleUs.marbleUs.blog.repository;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog,Long> {


    Optional<Blog> findById(Long id);
    List<Blog> findByTagsContaining(String tag);
    List<Blog> findByMemberId(Long memberId);
    List<Blog> findByCityId(Long cityId);


    @Query("SELECT b FROM Blog b where b.title LIKE %:word% OR b.body LIKE %:word%")
    List<Blog> findAllByKeywords(String word);
}
