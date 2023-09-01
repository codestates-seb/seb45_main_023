package com.marbleUs.marbleUs.blog.dto;

import com.marbleUs.marbleUs.comment.dto.CommentResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BlogResponseDto {
    private Long blogId;
    private String title;
    private String body;
    private List<String> tags;
    private List<CommentResponseDto> comments;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
