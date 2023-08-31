package com.marbleUs.marbleUs.blog.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BlogPostDto {
    private Long blogId;
    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;
    private String cityName;
    @NotBlank(message = "내용은 공백이 아니어야 합니다.")
    private String body;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
