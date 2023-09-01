package com.marbleUs.marbleUs.member.dto;

import com.marbleUs.marbleUs.blog.dto.BlogResponseDto;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.image.MemberImage;
import com.marbleUs.marbleUs.systemUtils.Stamps;
import com.marbleUs.marbleUs.systemUtils.UserLocations;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
public class MemberDto {

    @Getter
    @Setter
    public static class Register{

        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;

        @NotBlank(message = "yyyy-mm-dd 형식으로 기입하세요.")
        private String birthDate;

        @NotBlank
        private String nationality;



    }
    @Getter
    @Setter
    public static class Patch{


        private String password;

        private String nationality;

        private String nickname;

        private String currentCityCode;

        private UserLocations currentLocation;


    }

    @Getter
    @Setter
    public static class Response{

        private Long id;
        private String nickname;
        private String email;
        private int level;
        private List<MemberImageResponse> profilePics;
        private String nationality;
        private LocalDate birth;
        private List<Stamps> myStamps;
        private UserLocations currentLocation;
        private List<UserLocations> visitedCities;
        private List<BlogResponseDto> myBlogs;
        private List<BlogResponseDto> bookmarks;
    }

}
