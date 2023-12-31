package com.marbleUs.marbleUs.member.dto;

import com.marbleUs.marbleUs.common.tools.enums.Stamps;
import com.marbleUs.marbleUs.common.tools.enums.UserLocations;
import com.marbleUs.marbleUs.image.dto.ImageResponseDto;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

        private Long bookmarkId;

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
        private List<String> roles;
        private List<ImageResponseDto> profilePics;
        private String nationality;
        private LocalDate birth;
        private int follows;
        private int followers;
        private List<Stamps> myStamps;
        private UserLocations currentLocation;
        private List<UserLocations> visitedCities;

        private List<Long> bookmarks;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

}
