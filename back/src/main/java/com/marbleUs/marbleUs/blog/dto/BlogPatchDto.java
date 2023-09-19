package com.marbleUs.marbleUs.blog.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BlogPatchDto {


    private String title;

    private String body;

    private List<String> tags;
}
