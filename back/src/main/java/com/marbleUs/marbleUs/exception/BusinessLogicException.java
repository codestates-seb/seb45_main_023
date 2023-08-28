package com.marbleUs.marbleUs.exception;

import lombok.Getter;


public class BusinessLogicException extends RuntimeException{
    @Getter
    ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
