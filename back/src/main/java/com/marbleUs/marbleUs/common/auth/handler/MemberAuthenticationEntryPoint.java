package com.marbleUs.marbleUs.common.auth.handler;



import com.marbleUs.marbleUs.common.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.common.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.common.redis.service.RedisServiceUtil;
import com.marbleUs.marbleUs.common.redis.tools.ClientIpExtractor;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisServiceUtil redisServiceUtil;
    private final ClientIpExtractor interceptor;


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        Exception exception = (Exception) request.getAttribute("exception");
//        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);

        if (exception instanceof ExpiredJwtException) {
//            String refreshToken = request.getHeader("Refresh");



            Map<String, Object> claims = verifyJws(request);
            Map<String, Object>  newClaims = new HashMap<>();
            String username = (String) claims.get("sub");
            List<String> roles = authorityUtils.createRoles(username);
            newClaims.put("username",username);
            newClaims.put("roles", roles);

            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
            String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());
            String accessToken = jwtTokenizer.generateAccessToken(newClaims,username,expiration, base64EncodedSecretKey);


            setAuthenticationToContext(newClaims);

            log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            log.info("new token generated with RefreshToken +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");


            //새로운 액세스 토큰 응답 헤더에 담아 전송

            response.setHeader("NewAccessToken",accessToken);


        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Set the unauthorized status code
            response.getWriter().write("Token expired or invalid"); // Set the error message
            logExceptionMessage(authException, exception);
        }

    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(username,null,authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        log.info("Login Success with new AccessToken! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    }



    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String ip = interceptor.getClientIP(request);
        String jws = redisServiceUtil.getData(ip+"_Refresh").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());
        Map<String,Object> claims = jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();
        return claims;
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }

}

