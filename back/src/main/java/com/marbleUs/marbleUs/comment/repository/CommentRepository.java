package com.marbleUs.marbleUs.comment.repository;

import com.marbleUs.marbleUs.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    //댓글 ID를 기반으로 댓글 조회
    Optional<Comment> findByCommentId(Long commentId);

    //블로그 ID를 기반으로 댓글 목록 조회
    @Query("select c FROM Comment c WHERE c.blog.blogId = :blogId") //나중에 다시 찾아보기 왜 얘만 수동으로 쿼리를 넣어야하나??
    Page<Comment> findByBlogId(Long blogId, Pageable pageable);

    //특정 회원 ID를 기반으로 댓글 목록 조회
    Page<Comment> findByMemberId(Long memberId, Pageable pageable);




    //@Query("SELECT b FROM Blog b WHERE b.memberId = ?1")
}
