package com.marbleUs.marbleUs.blog.mapper;

import com.marbleUs.marbleUs.blog.dto.BlogPatchDto;
import com.marbleUs.marbleUs.blog.dto.BlogPostDto;
import com.marbleUs.marbleUs.blog.dto.BlogResponseDto;
import com.marbleUs.marbleUs.blog.entity.Blog;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BlogMapper {
    Blog toBlog (BlogPostDto blogPostDto);
    Blog toBlog (BlogPatchDto blogPatchDto);
    BlogResponseDto toBlogResponseDto (Blog blog);
    List<BlogResponseDto> toBlogResponseDtos (List<Blog> blogs);
}
