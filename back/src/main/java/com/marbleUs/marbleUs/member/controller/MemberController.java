package com.marbleUs.marbleUs.member.controller;

import com.marbleUs.marbleUs.argumentresolver.LoginMemberId;
import com.marbleUs.marbleUs.blog.service.BlogService;
import com.marbleUs.marbleUs.image.ImageService;
import com.marbleUs.marbleUs.member.dto.MemberDto;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.mapper.MemberMapper;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
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
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService service;
    private final BlogService blogService;
    private final ImageService ImgService;


    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody MemberDto.Register register
                                     ){

        LocalDate birthDay = LocalDate.parse(register.getBirthDate(), DateTimeFormatter.ISO_DATE);

        Member memberToSave = service.create(mapper.memberRegisterToMember(register,birthDay));

        return new ResponseEntity<>(mapper.memberToResponse(memberToSave),HttpStatus.CREATED);
    }

    @PostMapping("{member-id}/profile/upload")
    public ResponseEntity uploadProfilePic(@RequestPart("images") List<MultipartFile> images,
                                           @Positive @PathVariable("member-id") Long id) throws IOException {
        ImgService.uploadMemberImage(images,id);
        return new ResponseEntity<>("Profile Pic has been uploaded",HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@RequestBody MemberDto.Patch patch,
                                     @Positive @PathVariable("member-id") Long id){
        Member memberChanged = service.update(mapper.patchToMember(patch),id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("{member-id}/bookmark/{blog-id}")
    public ResponseEntity addBookMark(@Positive @PathVariable("member-id") Long memberId,
                                      @Positive @PathVariable("blog-id") Long blogId){
        Member findMember = service.findMember(memberId);
        findMember.addBookMarks(blogService.findBlog(blogId));
        service.update(findMember,memberId);
        return new ResponseEntity<>("bookmark is created",HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity getMember(@Positive @LoginMemberId long id){
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        System.out.println(principal);
        Member foundMember = service.findMember(id);


        return new ResponseEntity<>(mapper.memberToResponse(foundMember),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size){
        Page<Member> pages = service.findMembers(page,size);
        List<MemberDto.Response> responses = mapper.membersToResponses(pages.getContent());
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long memberId){
        service.deleteMember(memberId);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }

}
