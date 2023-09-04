package com.marbleUs.marbleUs.blog.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.marbleUs.marbleUs.common.argumentresolver.LoginMemberId;
import com.marbleUs.marbleUs.blog.dto.BlogPatchDto;
import com.marbleUs.marbleUs.blog.dto.BlogPostDto;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.mapper.BlogMapper;
import com.marbleUs.marbleUs.blog.service.BlogService;
import com.marbleUs.marbleUs.image.entity.Image;
import com.marbleUs.marbleUs.image.mapper.ImageMapper;
import com.marbleUs.marbleUs.image.service.ImageService;
import com.marbleUs.marbleUs.common.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class BlogController {
    private final BlogMapper blogMapper;
    private final BlogService blogService;
    private final ImageService imageService;
    private final ImageMapper imageMapper;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;




    //후기글 작성
    @PostMapping("blogs/{city-id}")
    public ResponseEntity postBlog (@LoginMemberId Long memberId,
                                    @PathVariable("city-id") Long cityId,
                                    @Valid @RequestBody BlogPostDto blogPostDto) {
        Blog blog = blogService.createBlog(blogMapper.toBlog(blogPostDto), memberId, cityId);
        return new ResponseEntity(blogMapper.toBlogResponseDto(blog),HttpStatus.CREATED);
    }

    //블로그 이미지 저장
    @PostMapping("blogs/{blog-id}/upload-images")
    public ResponseEntity postBlogImagesWithEditor(@RequestPart("images") List<MultipartFile> multipartFileList,
                                                   @PathVariable("blog-id") Long blogId) throws IOException {
        if (multipartFileList.isEmpty()) {
            return null;
        }
        List<Image> images = imageService.uploadBlogImage(multipartFileList,blogId);
        return new ResponseEntity<>(imageMapper.imagesToResponses(images), HttpStatus.OK);
    }

    //저장한 이미지 에디터에 추가
    //URL을 byte[]으로 변환 후 반환 리스트로 받아와서 변환하는 부분은 연구가 필요...
//    @GetMapping(value = "blogs/image-print", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
//    public List<byte[]> printEditorImage(@RequestParam List<String> names){
//
//        List<byte[]> binaryImages = names.stream().map( name -> {
//                    try {
//                    S3Object s3Object = amazonS3.getObject(bucket, name);
//                    InputStream inputStream = s3Object.getObjectContent();
//                    return IOUtils.toByteArray(inputStream);
//
//                    } catch (IOException e) {
//                        // 예외 처리
//                        throw new RuntimeException(e);
//                    }
//
//                }).collect(Collectors.toList());
//
//           return binaryImages;
//    }

    // 1. Raw 바이너리 데이터자체를 전송하기 보다 Base64로 인코딩데이터로 전송
    // 2. converting 에러를 막기위해 ResponseEntity를 사용해 문자열 리스트형태로 전송
    // 3. header에 컨텐츠타입을 지정해 오류를 방지
    // 의문점: 토스트 UI 에디터 사용시 이미지를 저장후 다시 html문서에 매핑할때 이처럼 바이너리 형태로 줘야 하는가? 아니면 이미지가 S3에 저장되어 있는 path를 주는것이 좋은가.
    @GetMapping(value = "/blogs/image-print")
    public ResponseEntity<List<String>> printEditorImage(@RequestParam List<String> names) {
        List<String> imagesAsBase64 = new ArrayList<>();

        for (String name : names) {
            try {
                S3Object s3Object = amazonS3.getObject(bucket, name);
                InputStream inputStream = s3Object.getObjectContent();
                byte[] imageBytes = IOUtils.toByteArray(inputStream);
                String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                imagesAsBase64.add(base64Image);

            } catch (IOException e) {
                // Handle the exception
                throw new RuntimeException(e);
            }
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // Set the appropriate content type

        return new ResponseEntity<>(imagesAsBase64, headers, HttpStatus.OK);
    }

    @PatchMapping(value = "/blogs/{blog-id}/image-update", consumes = "multipart/form-data")
    public ResponseEntity patchBlogImagesWithEditor(@RequestPart("images") List<MultipartFile> multipartFileList,
                                                    @RequestParam List<String> names,
                                                    @PathVariable("blog-id") Long blogId) throws IOException {
        if (multipartFileList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No images to update.");
        }
        List<Image> images = imageService.updateBlogImage(multipartFileList,names);
        return new ResponseEntity<>(imageMapper.imagesToResponses(images), HttpStatus.OK);
    }

    @DeleteMapping("blogs/image-delete")
    public ResponseEntity deleteBlogImageWithEditor(@RequestParam List<String> names){
        imageService.deleteBlogImage(names);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
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
        return new ResponseEntity("게시글이 삭제되었습니다.", HttpStatus.OK);
    }

    //특정 후기글 조회
    @GetMapping("blogs/{blog-id}")
    public ResponseEntity getBlog (@PathVariable("blog-id") Long blogId) {
        Blog blog = blogService.findBlog(blogId);
        return new ResponseEntity(blogMapper.toBlogResponseDto(blog),HttpStatus.OK);
    }

    //모든 후기글 조회
    @GetMapping("/blogs")
    public ResponseEntity getBlogs (@Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Blog> pageBlogs = blogService.findBlogs(page - 1, size);
        List<Blog> blogs = pageBlogs.getContent();

        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }

    //특정 태그 후기글 조회
    @GetMapping("/blogs/tags/{tag}")
    public ResponseEntity getBlogsByTag (@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("tag") String tag) {
        Page<Blog> pageBlogs = blogService.findBlogsByTag(page-1, size, tag);
        List<Blog> blogs = pageBlogs.getContent();
        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }

    //특정 멤버의 후기글 조회
    @GetMapping("/blogs/members/{member-id}")
    public ResponseEntity getBlogsByMember (@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("member-id") Long memberId) {
        Page<Blog> pageBlogs = blogService.findBlogsByMemberId(page-1, size, memberId);
        List<Blog> blogs = pageBlogs.getContent();
        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }

    //특정 도시의 후기글 조회
    @GetMapping("/blogs/cities/{city-id}")
    public ResponseEntity getBlogsByCity (@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("city-id") Long cityId) {
        Page<Blog> pageBlogs = blogService.findBlogsByCity(page-1, size, cityId);
        List<Blog> blogs = pageBlogs.getContent();
        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }

    @GetMapping("/blogs/my-bookmarks")
    public ResponseEntity getMyBookMarks (@Positive @RequestParam int page,
                                          @Positive @RequestParam int size,
                                          @RequestParam("bookmarks") List<Long> bookmarkIds) {
        Page<Blog> pageBlogs = blogService.findBookMarkedBlogs(bookmarkIds,page - 1, size);
        List<Blog> blogs = pageBlogs.getContent();

        return new ResponseEntity(new MultiResponseDto<>(blogMapper.toBlogResponseDtos(blogs),pageBlogs),HttpStatus.OK);
    }


}
