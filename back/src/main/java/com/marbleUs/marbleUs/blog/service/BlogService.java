package com.marbleUs.marbleUs.blog.service;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.repository.BlogRepository;
import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BlogService {
    private final BlogRepository blogRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final CityService cityService;


    public Blog createBlog(Blog blog,long memberId, long cityId) {
        blog.setMember(memberRepository.findById(memberId));
        City findCity = cityService.findVerifiedCity(cityId);
        blog.setCity(findCity);
        Member member = memberService.findVerifiedMember(memberId);
        member.addBlogs(blog);
        blog.setCreatedAt(LocalDateTime.now());
        blog.setModifiedAt(LocalDateTime.now());

        return blogRepository.save(blog);
    }

    public Blog updateBlog(Blog blog, long blogId) {
        Blog findBlog = findVerifiedBlog(blogId);
        Optional.ofNullable(blog.getTitle())                    //받은 객체의 title 값이 null이 아니면
                .ifPresent(title -> findBlog.setTitle(title));  //해당 값으로 업데이트
        Optional.ofNullable(blog.getBody())
                .ifPresent(body -> findBlog.setBody(body));
        Optional.ofNullable(blog.getTags())
                .ifPresent(tags -> findBlog.setTags(tags));
        findBlog.setModifiedAt(LocalDateTime.now());
        return blogRepository.save(findBlog);
    }
    public Blog findVerifiedBlog(long blogId) {
        return blogRepository.findById(blogId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BLOG_NOT_FOUND));
    }

    public Blog findBlog(long blogId) {
        return findVerifiedBlog(blogId);
    }

    public void deleteBlog(long blogId) {
        blogRepository.delete(findVerifiedBlog(blogId));
    }

    public Page<Blog> findBlogs(int page, int size) {
        return blogRepository.findAll(PageRequest.of(page, size, Sort.by("blogId").descending()));
    }


    public Page<Blog> findBlogsByTag(int page, int size, String tag) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("blogId").descending());

        List<Blog> tagBlogs = blogRepository.findByTagsContaining(tag);
        return new PageImpl<>(tagBlogs, pageRequest, tagBlogs.size());
    }

    public Page<Blog> findBlogsByMemberId(int page, int size, long memberId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("blogId").descending());
        List<Blog> memberBlogs = blogRepository.findByMemberId(memberId);
        return new PageImpl<>(memberBlogs, pageRequest, memberBlogs.size());
    }

    public Page<Blog> findBlogsByCity(int page, int size, long cityId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("blogId").descending());
        List<Blog> cityBlogs = blogRepository.findByCityId(cityId);
        return new PageImpl<>(cityBlogs, pageRequest, cityBlogs.size());
    }

    public Page<Blog> findBookMarkedBlogs(List<Long> bookmarkIds, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());

        List<Blog> findBlogs= bookmarkIds.stream().map(id ->{
            Blog blog = findVerifiedBlog(id);
            return blog;
        }).collect(Collectors.toList());
        return new PageImpl<>(findBlogs,pageRequest,findBlogs.size());
    }
}
