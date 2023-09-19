package com.marbleUs.marbleUs.blog.dto;

import com.marbleUs.marbleUs.comment.dto.CommentResponseDto;
import com.marbleUs.marbleUs.image.dto.ImageResponseDto;
import com.marbleUs.marbleUs.member.dto.MemberSummarizedResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BlogResponseDto {
    private Long id;
    private MemberSummarizedResponse member;
    private String cityName;
    private Long cityId;
    private String title;
    private String body;
    private Long view;
    private List<ImageResponseDto> images;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
