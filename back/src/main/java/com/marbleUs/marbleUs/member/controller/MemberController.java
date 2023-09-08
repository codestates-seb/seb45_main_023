package com.marbleUs.marbleUs.member.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.mapper.BlogMapper;
import com.marbleUs.marbleUs.common.argumentresolver.LoginMemberId;
import com.marbleUs.marbleUs.blog.service.BlogService;
import com.marbleUs.marbleUs.image.entity.Image;
//import com.marbleUs.marbleUs.image.mapper.ImageMapper;
//import com.marbleUs.marbleUs.image.service.ImageService;
import com.marbleUs.marbleUs.member.dto.MemberDto;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.mapper.MemberMapper;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequestMapping("/members")
@RequiredArgsConstructor
@Transactional
public class MemberController {

    private final MemberMapper mapper;
//    private final ImageMapper imgMapper;
    private final BlogMapper blogMapper;
    private final MemberService service;
//    private final ImageService imgService;
    private final BlogService blogService;


    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody MemberDto.Register register
                                     ){

//

        Member memberToSave = service.create(mapper.memberRegisterToMember(register));

        return new ResponseEntity<>(mapper.memberToResponse(memberToSave),HttpStatus.CREATED);
    }

//    @PostMapping("{member-id}/profile/upload")
//    public ResponseEntity uploadProfilePic(@RequestPart("images") List<MultipartFile> images,
//                                           @Positive @PathVariable("member-id") Long id) throws IOException {
//        imgService.uploadMemberImage(images,id);
//        return new ResponseEntity<>("Profile Pic has been uploaded",HttpStatus.OK);
//    }
//
//    //유저가 삭제하고싶은 사진들을 골라서 리스트형태로 삭제
//    @DeleteMapping("/pic-delete")
//    public ResponseEntity deleteMemberImage(@RequestParam List<String> names){
//        imgService.deleteMemberImage(names);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/pics/{member-id}")
//    public ResponseEntity getMemberProfilePics(@Positive @PathVariable("member-id") Long memberId){
//       List<Image> profilePics = imgService.findMemberImages(memberId);
//        return new ResponseEntity<>(imgMapper.imagesToResponses(profilePics),HttpStatus.OK);
//    }


    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@RequestBody MemberDto.Patch patch,
                                     @Positive @PathVariable("member-id") Long id){
        Member memberChanged = service.update(mapper.patchToMember(patch),id);

        return new ResponseEntity<>(mapper.memberToResponse(memberChanged),HttpStatus.OK);
    }




    //Get

    @GetMapping("/me")
    public ResponseEntity getMember(@Positive @LoginMemberId long id){

        Member foundMember = service.findMember(id);


        return new ResponseEntity<>(mapper.memberToResponse(foundMember),HttpStatus.OK);
    }

    @GetMapping("/{member-email}")
    public ResponseEntity getSpecificMember(@PathVariable("member-email") String email){

        Member foundMember = service.findMemberByEmail(email);

        return new ResponseEntity<>(mapper.memberToResponse(foundMember),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size){
        Page<Member> pages = service.findMembers(page,size);
        List<MemberDto.Response> responses = mapper.membersToResponses(pages.getContent());
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }


    //Delete
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long memberId){
        service.deleteMember(memberId);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }


    //북마크 생성 삭제
    @PatchMapping("{member-id}/bookmark/{blog-id}")
    public ResponseEntity addBookMark(@Positive @PathVariable("member-id") Long memberId,
                                      @Positive @PathVariable("blog-id") Long blogId){
        Member findMember = service.findMember(memberId);
        findMember.addBookMarks(blogService.findVerifiedBlog(blogId));
        service.saveMember(findMember);
        return new ResponseEntity<>("bookmark is created",HttpStatus.OK);
    }

    @GetMapping("bookmarks/{member-id}")
    public ResponseEntity getBookmark(@Positive @PathVariable("member-id") Long memberId,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size){
        Member findMember = service.findMember(memberId);
        Page<Blog> myBookmarks = service.findBookMarks(findMember,page,size);
        return new ResponseEntity<>(blogMapper.toBlogResponseDtos(myBookmarks.getContent()),HttpStatus.OK);
    }


    @PatchMapping("{member-id}/no-bookmark/{blog-id}")
    public ResponseEntity deleteBookMark(@Positive @PathVariable("member-id") Long memberId,
                                         @Positive @PathVariable("blog-id") Long blogId){
        Member findMember = service.findMember(memberId);
        findMember.deleteBookmark(blogId);
        service.saveMember(findMember);
        return new ResponseEntity<>("bookmark is deleted",HttpStatus.OK);
    }


    //팔로우/팔로워 생성 삭제

    @PatchMapping("{member-id}/follow/{following-member-id}")
    public ResponseEntity followMember(@Positive @PathVariable("member-id") Long memberId,
                                       @Positive @PathVariable("following-member-id") Long followedMemberId){
        Member findMember = service.findMember(memberId);
        Member followedMember = service.findMember(followedMemberId);
        service.saveFollowing(findMember,followedMember);
        return new ResponseEntity<>("the member is followed",HttpStatus.OK);
    }

    @PatchMapping("{member-id}/unfollow/{unfollowing-member-id}")
    public ResponseEntity unfollowMember(@Positive @PathVariable("member-id") Long memberId,
                                       @Positive @PathVariable("unfollowing-member-id") Long unfollowedMemberId){
        Member findMember = service.findMember(memberId);
        Member followedMember = service.findMember(unfollowedMemberId);
        service.unfollowMember(findMember,followedMember);
        return new ResponseEntity<>("the member is unfollowed",HttpStatus.OK);
    }

    @GetMapping("{member-id}/follows")
    public ResponseEntity getFollowMember(@Positive @PathVariable("member-id") Long memberId,
                                          @Positive @RequestParam int page,
                                          @Positive @RequestParam int size
                                          ){
        Member findMember = service.findMember(memberId);
        Page<Member> follows = service.findFollows(findMember,page,size);
        List<Member> followList = follows.getContent();
        return new ResponseEntity<>(mapper.membersToSummarizedResponses(followList),HttpStatus.OK);
    }

    @GetMapping("{member-id}/followers")
    public ResponseEntity getFollowers(@Positive @PathVariable("member-id") Long memberId,
                                          @Positive @RequestParam int page,
                                          @Positive @RequestParam int size
    ){
        Member findMember = service.findMember(memberId);
        Page<Member> followers = service.findFollowers(findMember,page,size);
        List<Member> followerList = followers.getContent();
        return new ResponseEntity<>(mapper.membersToSummarizedResponses(followerList),HttpStatus.OK);
    }



}
