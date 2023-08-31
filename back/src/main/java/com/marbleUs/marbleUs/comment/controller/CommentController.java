package com.marbleUs.marbleUs.comment.controller;

import com.marbleUs.marbleUs.comment.dto.CommentPatchDto;
import com.marbleUs.marbleUs.comment.dto.CommentPostDto;
import com.marbleUs.marbleUs.comment.entity.Comment;
import com.marbleUs.marbleUs.comment.mapper.CommentMapper;
import com.marbleUs.marbleUs.comment.service.CommentService;
import com.marbleUs.marbleUs.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController //RESTful. HTTP 요청과 응답을 처리
@RequestMapping("/comments") //api 엔드포인트의 기본 경로 설정
@RequiredArgsConstructor //의존성 주입을 위한 생성자를 자동으로 생성
@CrossOrigin(origins = "*", allowedHeaders = "*") //Cors 정책(도메인, http헤더)
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    //Could not autowire. No beans of 'CommentMapper' type found. 오류는 테스트실행하면 사라질것

    //댓글 작성
    @PostMapping("/{blog-id}/{member-id}/comments")
    public ResponseEntity postComment(@PathVariable("member-id") Long memberId, //url통해서 받아옴
                                      @PathVariable("blog-id") Long blogId,
                                      @Valid @RequestBody CommentPostDto commentPostDto){
        Comment comment = commentService.createComment(commentMapper.toCommentFromPostDto(commentPostDto), memberId, blogId);
        return new ResponseEntity<>(commentMapper.toCommentResponseDto(comment), HttpStatus.CREATED); //바디/헤더값
    }

    //댓글 수정
    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") Long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        Comment comment = commentService.updateComment(commentMapper.toCommentFromPatchDto(commentPatchDto), commentId);
        return new ResponseEntity<>(commentMapper.toCommentResponseDto(comment), HttpStatus.OK);

    }

    //댓글 삭제
    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>("댓글이 삭제되었습니다.", HttpStatus.OK);
    }

    //특정 댓글 조회
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") Long commentId) {
        Comment comment = commentService.findComment(commentId);
        return new ResponseEntity<>(commentMapper.toCommentResponseDto(comment), HttpStatus.OK);
    }

    //특정 회원별 댓글 조회
    @GetMapping("/members/{member-id}/comments")
    public ResponseEntity getCommentsByMember(@PathVariable("member-id") Long memberId,
                                              @Positive @RequestParam int page,
                                              @Positive @RequestParam int size) {
        Page<Comment> pageComments = commentService.findCommentByMemberId(page-1, size, memberId);
        List<Comment> comments = pageComments.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(commentMapper.toCommentResponseDto(comments), pageComments), HttpStatus.OK);
    }

    //블로그글(후기)별 댓글 조회
    @GetMapping("/blogs/{blog-id}/comments")
    public ResponseEntity getCommentsByBlog(@PathVariable("blog-id") Long blogId,
                                            @Positive @RequestParam int page,
                                            @Positive @RequestParam int size) {
        Page<Comment> pageComments = commentService.findCommentsByBlogId(blogId, page-1, size);
        List<Comment> comments = pageComments.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(commentMapper.toCommentResponseDto(comments), pageComments), HttpStatus.OK);
    }

}