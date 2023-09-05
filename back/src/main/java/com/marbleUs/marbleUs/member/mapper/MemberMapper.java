package com.marbleUs.marbleUs.member.mapper;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.common.tools.Stamps;
import com.marbleUs.marbleUs.member.dto.MemberDto;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.common.tools.UserLocations;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.util.ArrayList;
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
    default Member patchToMember(MemberDto.Patch patch){
        if ( patch == null ) {
            return null;
        }

        Member member = new Member();
        Blog blog = new Blog();
        blog.setId(patch.getBookmarkId());

        member.setNickname( patch.getNickname() );
        member.setPassword( patch.getPassword() );
        member.addBookMarks(blog);

        UserLocations currentLocation = patch.getCurrentLocation();
        if (currentLocation != null) {
            currentLocation.setCityCode(patch.getCurrentCityCode());
            member.setCurrentLocation(currentLocation);
        }
        member.setNationality( patch.getNationality() );

        return member;
    }


    ;
    MemberDto.Response memberToResponse(Member member);

    List<MemberDto.Response> membersToResponses(List<Member> members);

}
