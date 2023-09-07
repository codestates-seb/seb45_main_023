package com.marbleUs.marbleUs.common.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    CITY_NOT_FOUND(404, "City not found"),
    MEMBER_EXISTS(409, "Member exists"),
    CITY_EXISTS(409, "City exists"),
    ID_DOESNT_MATCH(403, "Id doesnt Match"),

    NOT_ALLOWED_BOOKMARK(403, "You can only bookmark others' blogs"),

    ALREADY_BOOKMARKED(403, "You already bookmarked this blog"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    COMMENT_NOT_EXIST(404, "Comment doesnt exist"),
    IMAGE_NOT_FOUND(404, "Image not found"),
    BLOG_NOT_FOUND(404, "Blog not found"),
    ALREADY_FOLLOWED(403,"already following member");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
