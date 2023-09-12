package com.marbleUs.marbleUs.common.websocket.chat.handler;

import com.marbleUs.marbleUs.common.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.common.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.common.redis.service.RedisServiceUtil;
import com.marbleUs.marbleUs.common.redis.tools.ClientIpInterceptor;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class StompHandler implements ChannelInterceptor {

    private final JwtTokenizer jwtTokenizer;
    private final RedisServiceUtil redisServiceUtil;
    private final CustomAuthorityUtils authorityUtils;

    // websocket을 통해 들어온 요청이 처리 되기전 실행됨
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        // websocket 연결시 헤더의 jwt token 유효성 검증
        if (StompCommand.CONNECT == accessor.getCommand()) {
            String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());
            String jws = accessor.getFirstNativeHeader("Authorization").replace("Bearer ", "");

            try {
                Map<String,Object> claims = jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();
                List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
                String username = claims.get("username").toString();
                Authentication authentication = new UsernamePasswordAuthenticationToken(username,null,authorities);

                log.info("hello "+ username);
                log.info("role: "+ claims.get("roles"));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (ExpiredJwtException ee) {
                WebSocketSession session = (WebSocketSession) accessor.getHeader("simpSession");
                String ip = session.getRemoteAddress().getAddress().getHostAddress();

                String refreshJws = redisServiceUtil.getData(ip+"_Refresh").replace("Bearer ", "");
                Map<String,Object> claims = jwtTokenizer.getClaims(refreshJws,base64EncodedSecretKey).getBody();

                List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
                String username = claims.get("username").toString();
                Authentication authentication = new UsernamePasswordAuthenticationToken(username,null,authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        }
        return message;
    }
}
