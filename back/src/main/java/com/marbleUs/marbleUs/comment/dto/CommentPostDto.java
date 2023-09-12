package com.marbleUs.marbleUs.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommentPostDto {
//    private Long commnetId; 자동이라 필요없음.
//    private Long blogId;  //댓글이 속한 블로그글(후기)의 Id / 컨트롤러에서 이미 받고있음.

    @NotBlank(message = "댓글내용을 작성해주세요.") //유효성 검사(오류메세지)
    private String body;

//    private String nickname;
//    private LocalDateTime createdAt;
//    private LocalDateTime modifiedAt;


}
