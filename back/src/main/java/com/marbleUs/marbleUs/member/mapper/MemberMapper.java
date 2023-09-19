package com.marbleUs.marbleUs.member.mapper;

import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.image.dto.ImageResponseDto;
import com.marbleUs.marbleUs.member.dto.MemberDto;
import com.marbleUs.marbleUs.member.dto.MemberSummarizedResponse;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.common.tools.enums.UserLocations;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberRegisterToMember(MemberDto.Register register){
        if ( register == null ) {
            return null;
        }

        Member member = new Member();

        member.setBirth(LocalDate.parse(register.getBirthDate(), DateTimeFormatter.ISO_DATE));
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
            currentLocation.setCityName(patch.getCurrentCityCode());
            member.setCurrentLocation(currentLocation);
        }
        member.setNationality( patch.getNationality() );

        return member;
    }


    ;
    default MemberDto.Response memberToResponse(Member member){
        if ( member == null ) {
            return null;
        }

        MemberDto.Response response = new MemberDto.Response();

        response.setRoles(member.getRoles());
        response.setId( member.getId() );
        response.setNickname( member.getNickname() );
        response.setEmail( member.getEmail() );
        response.setLevel( member.getLevel() );
        response.setProfilePics(  member.getProfilePics().stream().map(
                image -> {
                    ImageResponseDto imageResponseDto = new ImageResponseDto();
                    imageResponseDto.setName(image.getName());
                    imageResponseDto.setPath(image.getPath());
                    return imageResponseDto;
                }
        ).collect(Collectors.toList()) );


        response.setNationality( member.getNationality() );
        response.setBirth( member.getBirth() );

        response.setFollows(member.getFollows().size());
        response.setFollowers(member.getFollowers().size());

        List<Stamps> list3 = member.getMyStamps();
        if ( list3 != null ) {
            response.setMyStamps( new ArrayList<Stamps>( list3 ) );
        }
        response.setCurrentLocation( member.getCurrentLocation() );
        List<UserLocations> list4 = member.getVisitedCities();
        if ( list4 != null ) {
            response.setVisitedCities( new ArrayList<UserLocations>( list4 ) );
        }
        List<Long> list5 = member.getBookmarks();
        if ( list5 != null ) {
            response.setBookmarks( new ArrayList<Long>( list5 ) );
        }
        response.setCreatedAt(  member.getCreatedAt() );
        response.setModifiedAt(  member.getModifiedAt() );

        return response;
    };

    List<MemberDto.Response> membersToResponses(List<Member> members);

    List<MemberSummarizedResponse> membersToSummarizedResponses(List<Member> members);


}
