package com.marbleUs.marbleUs.blog.controller;

import com.marbleUs.marbleUs.argumentresolver.LoginMemberId;
import com.marbleUs.marbleUs.blog.dto.BlogPatchDto;
import com.marbleUs.marbleUs.blog.dto.BlogPostDto;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.mapper.BlogMapper;
import com.marbleUs.marbleUs.blog.service.BlogService;
import com.marbleUs.marbleUs.response.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BlogController {
    private final BlogMapper blogMapper;
    private final BlogService blogService;

    public BlogController(BlogMapper blogMapper, BlogService blogService) {
        this.blogMapper = blogMapper;
        this.blogService = blogService;
    }


    //후기글 작성
    @PostMapping("{member-id}/blogs/{city-id}")
    public ResponseEntity postBlog (@PathVariable("member-id") Long memberId,
                                    @PathVariable("city-id") Long cityId,
                                    @Valid @RequestBody BlogPostDto blogPostDto) {
        Blog blog = blogService.createBlog(blogMapper.toBlog(blogPostDto), memberId, cityId);
        return new ResponseEntity(blogMapper.toBlogResponseDto(blog),HttpStatus.CREATED);
    }

    //후기글 수정
    @PatchMapping("blogs/{blog-id}")
    public ResponseEntity patchBlog (@PathVariable("blog-id") Long blogId,
                                    @Valid @RequestBody BlogPatchDto blogPatchDto) {
        Blog blog = blogService.updateBlog(blogMapper.toBlog(blogPatchDto),blogId);
        return new ResponseEntity(blogMapper.toBlogResponseDto(blog),HttpStatus.CREATED);
    }

    //후기글 삭제
    @DeleteMapping("blogs/{blog-id}")
    public ResponseEntity deleteBlog (@PathVariable("blog-id") Long blogId) {
        blogService.deleteBlog(blogId);
        return new ResponseEntity("게시글이 삭제되었습니다.",HttpStatus.OK);
    }

    //특정 후기글 조회
    @GetMapping("blogs/{blog-id}")
    public ResponseEntity getBlog (@PathVariable("blog-id") Long blogId) {
        Blog blog = blogService.findBlog(blogId);
        return new ResponseEntity(blogMapper.toBlogResponseDto(blog),HttpStatus.OK);
    }

    //모든 후기글 조회
    @GetMapping("blogs")
    public ResponseEntity getBlogs (@Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Blog> pageBlogs = blogService.findBlogs(page - 1, size);
        List<Blog> blogs = pageBlogs.getContent();

        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }

    //특정 태그 후기글 조회
    @GetMapping("blogs/tags/{tag}")
    public ResponseEntity getBlogsByTag (@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("tag") String tag) {
        Page<Blog> pageBlogs = blogService.findBlogsByTag(page, size, tag);
        List<Blog> blogs = pageBlogs.getContent();
        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }

    //특정 멤버의 후기글 조회
    @GetMapping("blogs/members/{member-id}")
    public ResponseEntity getBlogsByMember (@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("member-id") Long memberId) {
        Page<Blog> pageBlogs = blogService.findBlogsByMemberId(page, size, memberId);
        List<Blog> blogs = pageBlogs.getContent();
        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }

    //특정 도시의 후기글 조회
    @GetMapping("blogs/cities/{city-id}")
    public ResponseEntity getBlogsByCity (@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("city-id") Long cityId) {
        Page<Blog> pageBlogs = blogService.findBlogsByCity(page, size, cityId);
        List<Blog> blogs = pageBlogs.getContent();
        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }


}
