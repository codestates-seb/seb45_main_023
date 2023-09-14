package com.marbleUs.marbleUs.common.tools.verifier;

import com.marbleUs.marbleUs.common.exception.BusinessLogicException;
import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberVerifier {

    private final MemberRepository memberRepository;
    public boolean verifyIsMemberActive(Member member){

        if (member.getMemberStatus()== Member.Status.MEMBER_INACTIVE) return false;
        return true;
    }

    public void verifyExistsEmail(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);

    }

    public boolean verifyExistMember(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            return true;
        }
        return false;
    }
}
