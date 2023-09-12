package com.marbleUs.marbleUs.comment.service;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.service.BlogService;
import com.marbleUs.marbleUs.comment.entity.Comment;
import com.marbleUs.marbleUs.comment.repository.CommentRepository;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final BlogService blogService;

    //댓글 생성 메서드
    public Comment createComment(Comment comment, long memberId, long blogId) {
        //댓글 작성자 정보 설정
        Member member = memberService.findVerifiedMember(memberId);
        comment.setMember(member);
        member.addMyComment(comment);
        //연결할 블로그 검색 및 설정
        Blog findBlog = blogService.findVerifiedBlog(blogId);
        findBlog.addComment(comment);
        comment.setBlog(findBlog);

        //댓글 생성,수정 시간
        LocalDateTime now = LocalDateTime.now();
        comment.setCreatedAt(now);
        comment.setModifiedAt(now);

        //댓글 저장 후 반환
        return commentRepository.save(comment); //저장후 컨트롤러의 commet객체로
    }


    //댓글 업데이트 메서드 //업데이트는 일부만 수정되서 오기도 하므로 주의
    public Comment updateComment(Comment comment, Long commentId) {
        //댓글 아이디로 댓글 찾기
        Comment findComment = findVerifiedComment(commentId);

        //업데이트할 댓글 객체에서 본문 가져오기
        Optional.ofNullable(comment.getBody())
                .ifPresent(body -> findComment.setBody(body)); // 본문이 null이 아니면 본문 내용 업데이트

        //수정 시간 설정
        findComment.setModifiedAt(LocalDateTime.now());

        //업데이트 된 댓글 반환
        return commentRepository.save(findComment);
    }

    //댓글 삭제 메서드
    public void deleteComment(long commentId) {

        commentRepository.delete(findVerifiedComment(commentId));
    }

    //검증된 댓글 조회 메서드
    public Comment findVerifiedComment(long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_EXIST));
    }

    //댓글 조회 메서드
    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    //페이지네이션을 사용하여 모든 댓글 조회 메서드(필요한가??)
    public Page<Comment> findAllComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }

    //특정 블로그글(후기)에 속하는 댓글을 페이지네이션을 사용하여 조회하는 메서드
    public Page<Comment> findCommentsByBlogId(long blogId, int page, int size) {
        return commentRepository.findByBlogId(blogId, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    //특정 회원이 작성한 댓글을 페이지네이션을 사용하여 조회하는 메서드
    public Page<Comment> findCommentByMemberId(int page, int size, Long memberId) {
        //특정 회원별 댓글 조회
        return commentRepository.findByMemberId(memberId, PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }


}
