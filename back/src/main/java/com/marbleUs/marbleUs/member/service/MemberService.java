package com.marbleUs.marbleUs.member.service;

import com.marbleUs.marbleUs.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.exception.BusinessLogicException;
import com.marbleUs.marbleUs.exception.ExceptionCode;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import com.marbleUs.marbleUs.systemUtils.MemberNickNameGenerator;
import com.marbleUs.marbleUs.systemUtils.NickNameGenerator;
import lombok.RequiredArgsConstructor;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberNickNameGenerator nickNameGenerator;

    // (2) 생성자 DI용 파라미터 추가


    public Member create(Member member) {
        verifyExistsEmail(member.getEmail());

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
    public Member update(Member member, Long id){

        //수정하려는 사용자와 수정자가 같은 계정인지 확인

        Member findMember = findVerifiedMember(id);
        Optional.ofNullable(member.getPassword())
                .ifPresent( password ->
                        findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getNationality())
                .ifPresent( nationality -> findMember.setNationality(nationality));
        Optional.ofNullable(member.getNickname())
                .ifPresent( nickname -> findMember.setNickname(nickname));

        Optional.ofNullable(member.getCurrentLocation())
                .ifPresent( location -> {
                    if (findMember.getCurrentLocation().getNum()>=location.getNum()){
                        int currentLevel = findMember.getLevel() +1;
                        findMember.setLevel(currentLevel);
                    }
                        findMember.setCurrentLocation(location);
                        findMember.addLocation(location);
                });

        return memberRepository.save(findMember);

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



    public void deleteMember(Long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }


    //Utils

    private void verifyExistsEmail(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);

        }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long id) {
        Optional<Member> optionalMember =
                memberRepository.findById(id);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
    }

