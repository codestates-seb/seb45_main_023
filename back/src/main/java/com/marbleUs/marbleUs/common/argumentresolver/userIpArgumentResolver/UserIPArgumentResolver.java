package com.marbleUs.marbleUs.common.argumentresolver.userIpArgumentResolver;

import com.marbleUs.marbleUs.common.redis.tools.ClientIpExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class UserIPArgumentResolver implements HandlerMethodArgumentResolver {

    private final ClientIpExtractor ipExtractor;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        parameter.getParameterAnnotations();
        return true;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        String ip = ipExtractor.getClientIP((HttpServletRequest) webRequest);
        return ip;
    }
}
