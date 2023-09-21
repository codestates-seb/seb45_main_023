package com.marbleUs.marbleUs.member.service;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.blog.repository.BlogRepository;
import com.marbleUs.marbleUs.common.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.common.tools.calculator.Calculators;
import com.marbleUs.marbleUs.common.tools.enums.UserLocations;
import com.marbleUs.marbleUs.common.tools.verifier.MemberVerifier;
import com.marbleUs.marbleUs.member.entity.Follow;
import com.marbleUs.marbleUs.member.entity.Follower;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.FollowRepository;
import com.marbleUs.marbleUs.member.repository.FollowerRepository;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import com.marbleUs.marbleUs.common.tools.generator.MemberNickNameGenerator;
import com.marbleUs.marbleUs.common.tools.generator.NickNameGenerator;
import lombok.RequiredArgsConstructor;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final BlogRepository blogRepository;
    private final FollowRepository followRepository;
    private final FollowerRepository followerRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberNickNameGenerator nickNameGenerator;
    private final MemberVerifier memberVerifier;
    private final Calculators calculator;

    // (2) 생성자 DI용 파라미터 추가


    public Member create(Member member) {
        memberVerifier.verifyExistsEmail(member.getEmail());

        // Password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        //  DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        String nickName = nickNameGenerator.randomNickNameGenerator(NickNameGenerator.adjectives,NickNameGenerator.animals);
        member.setNickname(nickName);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    // 추후 로그인 사용자 자동 아이디 검색으로 수정 @LoginMemberId 사용
    public Member update(Member member, Long id, Long loginMember){


        Member findMember = findVerifiedMember(id);
        //수정하려는 사용자와 수정자가 같은 계정인지 확인
        verifyIsSameMember(findMember,loginMember);

        Optional.ofNullable(member.getPassword())
                .ifPresent( password ->
                        findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getNationality())
                .ifPresent( nationality -> findMember.setNationality(nationality));
        Optional.ofNullable(member.getNickname())
                .ifPresent( nickname -> {
                        Optional<Member> member2 = memberRepository.findByNickname(nickname);
                        if(member2.isPresent()) throw new BusinessLogicException(ExceptionCode.NICKNAME_EXIST);
                        findMember.setNickname(nickname);
                });

        Optional.ofNullable(member.getCurrentLocation())
                .ifPresent( location -> {
                    calculator.memberLocationCalculator(findMember, location);
                });


        return memberRepository.save(findMember);

    }



    public void saveMember(Member member){
        memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }


    //관리자만 조회 가능하게 추후 수정 요망
    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size){
        return memberRepository.findAll(PageRequest.of(page-1,size, Sort.by("id").descending()));
    }



    public void deleteMember(Long memberId, Long loginMember) {
        Member memberToDelete = findVerifiedMember(memberId);

        //verify if the member who wants to quit is the same user as the one saved in DB

        verifyIsSameMember(memberToDelete,loginMember);
        memberToDelete.setMemberStatus(Member.Status.MEMBER_INACTIVE);
        memberRepository.save(memberToDelete);

    }

    public void verifyIsSameMember(Member member, Long loginMember){
        if (!member.getId().equals(loginMember)) throw new BusinessLogicException(ExceptionCode.ID_DOESNT_MATCH);
    }


    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long id) {

        Optional<Member> optionalMember = memberRepository.findById(id);

        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (findMember.getMemberStatus() != Member.Status.MEMBER_INACTIVE) return findMember;


        throw new BusinessLogicException(ExceptionCode.MEMBER_INACTIVE);
    }

    public Member findMemberByEmail(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }

    public void saveFollowing(Member findMember, Member followedMember, Long loginMember) {

        verifyIsSameMember(findMember,loginMember);

        if(memberVerifier.verifyIsMemberActive(followedMember)){

            Follow follow = new Follow();
            follow.setMember(findMember);
            follow.setFollowedMember(followedMember);
            followRepository.save(follow);
            findMember.addFollow(follow);
            saveMember(findMember);

            Follower follower = new Follower();
            follower.setMember(followedMember);
            follower.setFollower(findMember);
            followerRepository.save(follower);
            followedMember.addFollower(follower);
            saveMember(followedMember);}
        else throw new BusinessLogicException(ExceptionCode.MEMBER_INACTIVE);
    }

    public void unfollowMember(Member findMember, Member followedMember, Long loginMember) {

        verifyIsSameMember(findMember,loginMember);

        Follow follow = followRepository.findByMemberAndFollowedMember(findMember,followedMember).get();
        findMember.unFollow(follow);
        followRepository.delete(follow);
        saveMember(findMember);

        Follower follower = followerRepository.findByMemberAndFollower(followedMember,findMember).get();
        followedMember.deleteFollower(follower);
        followerRepository.delete(follower);
        saveMember(followedMember);

    }

    public Page<Member> findFollows(Member findMember,Long loginMember,int page,int size) {

        verifyIsSameMember(findMember,loginMember);

        List<Member> follows = findMember.getFollows().stream().map(
                follow-> {
                    Member followedMember = follow.getFollowedMember();
                    if (memberVerifier.verifyIsMemberActive(followedMember)) {return followedMember;
                    }else return null;
                }).filter(Objects::nonNull).collect(Collectors.toList());
        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.by("createdAt").descending());

        return new PageImpl<>(follows,pageRequest,follows.size());
    }

    public Page<Member> findFollowers(Member findMember,Long loginMember, int page,int size) {

        verifyIsSameMember(findMember,loginMember);

        List<Member> followers = findMember.getFollowers().stream().map(
                follower-> {
                    Member findFollower = follower.getFollower();
                    if (memberVerifier.verifyIsMemberActive(findFollower)) {return findFollower;}
                    else return null;
                }).filter(Objects::nonNull).collect(Collectors.toList());
        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.by("createdAt").descending());

        return new PageImpl<>(followers,pageRequest,followers.size());
    }

    public Page<Blog> findBookMarks(Member findMember,Long loginMember,int page,int size) {

        verifyIsSameMember(findMember,loginMember);

        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.by("createdAt").descending());

        List<Long> myBookmarks = findMember.getBookmarks();
        List<Blog> bookMarks = findMember.getBookmarks().stream().map(id->{
            Optional<Blog> findBlog = blogRepository.findById(id);
            if (findBlog.isEmpty()) {
                myBookmarks.remove(id);
            }
            return findBlog.orElse(null);
        }).collect(Collectors.toList());
        List<Blog> result = bookMarks.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return new PageImpl<>(result,pageRequest,bookMarks.size());
    }

    public void addBookMark(Long memberId, Long loginMember ,Long blogId) {

        Member findMember = findVerifiedMember(memberId);
        verifyIsSameMember(findMember,loginMember);
        findMember.addBookMarks(blogRepository.findById(blogId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.BLOG_NOT_FOUND)));
        saveMember(findMember);
    }

    public void deleteBookMark(Long memberId,Long loginMember, Long blogId) {
        Member findMember = findVerifiedMember(memberId);
        verifyIsSameMember(findMember,loginMember);
        findMember.deleteBookmark(blogId);
        saveMember(findMember);
    }
}

