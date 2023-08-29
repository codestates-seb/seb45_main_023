package com.marbleUs.marbleUs.member.mapper;

import com.marbleUs.marbleUs.member.dto.MemberDto;
import com.marbleUs.marbleUs.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberRegisterToMember(MemberDto.Register register, LocalDate birthday){
        if ( register == null ) {
            return null;
        }

        Member member = new Member();

        member.setBirth(birthday);
        member.setEmail(register.getEmail());
        member.setPassword(register.getPassword());
        member.setNationality(register.getNationality());

        return member;
    };
    Member patchToMember(MemberDto.Patch patch);
    MemberDto.Response memberToResponse(Member member);

    List<MemberDto.Response> membersToResponses(List<Member> members);
}
