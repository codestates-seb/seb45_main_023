package com.marbleUs.marbleUs.blog.service;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.repository.BlogRepository;
import com.marbleUs.marbleUs.city.entity.City;
import com.marbleUs.marbleUs.city.service.CityService;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.common.s3.service.S3Service;
import com.marbleUs.marbleUs.common.tools.counter.ViewCounter;
import com.marbleUs.marbleUs.image.entity.Image;
import com.marbleUs.marbleUs.image.repository.ImageRepository;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BlogService {
    private final BlogRepository blogRepository;
    private final MemberRepository memberRepository;
    private final ViewCounter viewCounter;
    private final MemberService memberService;
    private final CityService cityService;
    private final ImageRepository imageRepository;
    private final S3Service s3Service;


    @Transactional
    public Blog createBlog(Blog blog,long memberId, long cityId,List<String> images) {
        blog.setMember(memberRepository.findById(memberId));
        City findCity = cityService.findVerifiedCity(cityId);
        blog.setCity(findCity);
        Member member = memberService.findVerifiedMember(memberId);
        member.addBlogs(blog);
        blog.setCreatedAt(LocalDateTime.now());
        blog.setModifiedAt(LocalDateTime.now());

        if (!images.isEmpty()) {
            for (String image : images) {
                Image img = imageRepository.findByName(image).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
                img.setBlog(blog);
                blog.addBlogImage(img);
                imageRepository.save(img);
            }
        }

        return blogRepository.save(blog);
    }

    public Blog updateBlog(Blog blog, long blogId, List<String> imageNames, Long loginMember) {

        Blog findBlog = findVerifiedBlog(blogId);

        //이미지 초기화
        List<Image> images = findBlog.getImages();
        for (Image image : images){
            s3Service.delete(image.getName());
            imageRepository.delete(image);

        }
        images.clear();

        if (!imageNames.isEmpty()) {
            for (String image : imageNames) {
                Image img = imageRepository.findByName(image).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
                img.setBlog(findBlog);
                findBlog.addBlogImage(img);
                imageRepository.save(img);
            }
        }

        //작성자와 수정자가 동일인물인지 검증
        memberService.verifyIsSameMember(findBlog.getMember(),loginMember);

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

    public Blog findBlog(HttpServletRequest request, long blogId) {
        Blog blog = findVerifiedBlog(blogId);
        viewCounter.verifyIsViewed(request,blog);
        blogRepository.save(blog);
        return blog;
    }

    @Transactional
    public void deleteBlog(long blogId, List<String> images, Long loginMember) {

        Blog blog = findVerifiedBlog(blogId);
        memberService.verifyIsSameMember(blog.getMember(),loginMember);

        if (!images.isEmpty()) {
            for (String image : images) {
                s3Service.delete(image);
            }
        }
        blogRepository.delete(blog);

    }

    public Page<Blog> findBlogs(int page, int size) {
        return blogRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }


    public Page<Blog> findBlogsByTag(int page, int size, String tag) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());

        Page<Blog> tagBlogs = blogRepository.findByTagsContaining(tag, pageRequest);
        return tagBlogs;
    }

    public Page<Blog> findBlogsByMemberId(int page, int size, long memberId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Blog> memberBlogs = blogRepository.findByMemberId(memberId, pageRequest);


        return memberBlogs;
    }

    public Page<Blog> findBlogsByCity(int page, int size, long cityId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Blog> cityBlogs = blogRepository.findByCityId(cityId, pageRequest);
        return cityBlogs;
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
