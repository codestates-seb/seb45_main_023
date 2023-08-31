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
    CommentResponseDto toCommentResponseDto(Comment comment);

    //Comment리스트를 CommentResponseDto리스트로 변환하는 메서드
    List<CommentResponseDto> toCommentResponseDto(List<Comment> comments);


}
