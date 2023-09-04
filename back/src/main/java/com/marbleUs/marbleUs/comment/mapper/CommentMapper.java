package com.marbleUs.marbleUs.comment.mapper;

import com.marbleUs.marbleUs.comment.dto.CommentPatchDto;
import com.marbleUs.marbleUs.comment.dto.CommentPostDto;
import com.marbleUs.marbleUs.comment.dto.CommentResponseDto;
import com.marbleUs.marbleUs.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    //CommentPostDto를 Comment로 변환하는 메서드
    Comment toCommentFromPostDto(CommentPostDto commentPostDto);

    //CommentPatchDto를 Comment로 변환하는 메서드
    Comment toCommentFromPatchDto(CommentPatchDto commentPatchDtoDto);


    //Comment를 CommentResponseDto로 변환하는 메서드
    default CommentResponseDto toCommentResponseDto(Comment comment){
        if ( comment == null ) {
            return null;
        }

        CommentResponseDto commentResponseDto = new CommentResponseDto();

        commentResponseDto.setId( comment.getId() );
        commentResponseDto.setBody( comment.getBody() );
        commentResponseDto.setBlogId(comment.getBlog().getId());
        commentResponseDto.setCreatedAt( comment.getCreatedAt() );
        commentResponseDto.setModifiedAt( comment.getModifiedAt() );
        commentResponseDto.setNickname( comment.getMember().getNickname());

        return commentResponseDto;
    }

    //Comment리스트를 CommentResponseDto리스트로 변환하는 메서드
    List<CommentResponseDto> toCommentResponseDto(List<Comment> comments);


}
