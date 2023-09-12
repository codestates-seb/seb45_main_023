package com.marbleUs.marbleUs.common.response;


import com.marbleUs.marbleUs.common.exception.ExceptionCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {

    private int status;

    private String message;

    private List<FieldError> fieldErrors;

    private List<ConstraintViolationError> constraintViolationErrors;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> constraintViolationErrors) {
        this.fieldErrors = fieldErrors;
        this.constraintViolationErrors = constraintViolationErrors;
    }

    public static ErrorResponse of(BindingResult bindingResult){
        return new ErrorResponse(FieldError.of(bindingResult),null);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> constraintViolations){
        return new ErrorResponse(null, ConstraintViolationError.of(constraintViolations));
    }

    // 비지니스 로직 에러만 따로 처러
    public static ErrorResponse of(ExceptionCode exceptionCode){
        return new ErrorResponse(exceptionCode.getStatus(),exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus){
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }
    public static ErrorResponse of(HttpStatus httpStatus, String message){
        return new ErrorResponse(httpStatus.value(), message);
    }

    @Getter
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

        public FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }



        public static List<FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();

            return fieldErrors.stream()
                    .map(fieldError -> new FieldError(
                            fieldError.getField(),
                            fieldError.getRejectedValue() == null ? "" : fieldError.getRejectedValue().toString(),
                            fieldError.getDefaultMessage()))
                    .collect(Collectors.toList());
        }

    }

    @Getter
    public static class ConstraintViolationError {

        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        public ConstraintViolationError(String propertyPath, Object rejectedValue, String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(
                Set<ConstraintViolation<?>> constraintViolations
        ){
            return constraintViolations.stream()
                    .map(
                            constraintViolation ->
                                    new ConstraintViolationError(
                                            constraintViolation.getPropertyPath().toString(),
                                            constraintViolation.getInvalidValue().toString(),
                                            constraintViolation.getMessage()
                                    )
                    ).collect(Collectors.toList());
        }
    }

//    @Getter
//    public static class BusinessLogicExceptionError{
//        private int status;
//        private String message;
//
//        public BusinessLogicExceptionError(int status, String message) {
//            this.status = status;
//            this.message = message;
//        }

    }


