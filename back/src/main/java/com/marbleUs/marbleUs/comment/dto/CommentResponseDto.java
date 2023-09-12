package com.marbleUs.marbleUs.comment.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {

    private Long id;
    private Long blogId;  //댓글이 속한 블로그글(후기)의 Id
    private String body; //서비스계층에서 바디만 업데이트받아옴
    private String nickname;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}
