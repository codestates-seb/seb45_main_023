package com.marbleUs.marbleUs.common.argumentresolver;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.PARAMETER) // 메서드의 파라미터에 적용
@Retention(RetentionPolicy.RUNTIME) // 어노테이션의 수명주기를 런타임 동안
public @interface LoginMemberId {
}
