package com.marbleUs.marbleUs.common.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marbleUs.marbleUs.common.auth.dto.LoginDto;
import com.marbleUs.marbleUs.common.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.common.redis.service.RedisServiceUtil;
import com.marbleUs.marbleUs.common.redis.tools.ClientIpExtractor;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.security.auth.message.AuthException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RedisServiceUtil redisServiceUtil;
    private final ClientIpExtractor extractor;


    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        Member member = memberService.findMemberByEmail(loginDto.getEmail());
        if (member.getMemberStatus() == Member.Status.MEMBER_INACTIVE) throw new AuthException("Member is inactive. Please contact us.");

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        Member member = (Member) authResult.getPrincipal();  //

        String accessToken = delegateAccessToken(member);   //
        String ip = extractor.getClientIP(request);
        delegateRefreshToken(member,ip); //
        log.info("accessToken is generated");


        //로그인 히스토리 생성
        Member findMember = memberService.findVerifiedMember(member.getId());
        findMember.setLastLogin(LocalDateTime.now());
        memberService.saveMember(findMember);


        response.setHeader("Authorization", accessToken);
//        response.setHeader("Refresh", refreshToken);
    }

    // (5)

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // (6)
    private void delegateRefreshToken(Member member, String ip) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        Instant now = Instant.now();
        Instant expirationDate = expiration.toInstant();
        long secondsBetween = redisServiceUtil.expirationSecondGenerator(now,expirationDate);
        redisServiceUtil.setDateExpire(ip+"_Refresh",refreshToken,secondsBetween);

//        return refreshToken;
    }
}
