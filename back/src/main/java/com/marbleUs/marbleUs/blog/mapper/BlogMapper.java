package com.marbleUs.marbleUs.blog.mapper;

import com.marbleUs.marbleUs.blog.dto.BlogPatchDto;
import com.marbleUs.marbleUs.blog.dto.BlogPostDto;
import com.marbleUs.marbleUs.blog.dto.BlogResponseDto;
import com.marbleUs.marbleUs.blog.entity.Blog;
import com.marbleUs.marbleUs.comment.dto.CommentResponseDto;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BlogMapper {
    Blog toBlog (BlogPostDto blogPostDto);
    Blog toBlog (BlogPatchDto blogPatchDto);
    default BlogResponseDto toBlogResponseDto (Blog blog){
        if ( blog == null ) {
            return null;
        }

        BlogResponseDto blogResponseDto = new BlogResponseDto();


        blogResponseDto.setId( blog.getId() );
        blogResponseDto.setTitle( blog.getTitle() );
        blogResponseDto.setBody( blog.getBody() );
        blogResponseDto.setView(blog.getViews());
        List<String> list = blog.getTags();
        if ( list != null ) {
            blogResponseDto.setTags( new ArrayList<String>( list ) );
        }
        blogResponseDto.setCreatedAt( blog.getCreatedAt() );
        blogResponseDto.setModifiedAt( blog.getModifiedAt() );

        return blogResponseDto;
    };
    List<BlogResponseDto> toBlogResponseDtos (List<Blog> blogs);
}
