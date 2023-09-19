package com.marbleUs.marbleUs.common.auth.handler;




import com.marbleUs.marbleUs.common.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.common.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.common.redis.service.RedisServiceUtil;
import com.marbleUs.marbleUs.common.redis.tools.ClientIpExtractor;
import com.marbleUs.marbleUs.common.tools.generator.NickNameGenerator;
import com.marbleUs.marbleUs.common.tools.verifier.MemberVerifier;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
public class OAuth2memberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final RedisServiceUtil redisServiceUtil;
    private final ClientIpExtractor extractor;
    private final MemberVerifier memberVerifier;
    private final NickNameGenerator nickNameGenerator;
    private final PasswordEncoder passwordEncoder;



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String birth = String.valueOf(oAuth2User.getAttributes().get("email"));
//        String profilePic = String.valueOf(oAuth2User.getAttributes().get("picture"));
        List<String> authorities = authorityUtils.createRoles(email);
        if (!memberVerifier.verifyExistMember(email)) {saveMember(email, authorities);}


        log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
        log.info("Member Sign Up Process 1 :: Member is created!:: " + email );
        log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );


        redirect(request,response,email,authorities);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username,List<String> authorities) throws IOException{

        String accessToken = delegateAccessToken(username, authorities);
        String ip = extractor.getClientIP(request);
        delegateRefreshToken(username,ip);

        String uri = createURI(accessToken).toString();

        log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
        log.info("Login Process 0. AccessToken & RefreshToken is created!::");
        log.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );

        getRedirectStrategy().sendRedirect(request,response,uri);


    }

    private URI createURI(String accessToken) {
        MultiValueMap<String,String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("marbleus-s3.s3-website.ap-northeast-2.amazonaws.com")
                .path("/oauth-token")//redirect 받기 위한 주소
                .queryParams(queryParams)
                .build().toUri();
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username",username);
        claims.put("roles", authorities);

        String subject = username;

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);
        return accessToken;
    }

    private String delegateRefreshToken(String username, String ip) {

        String subject = username;

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);

        Instant now = Instant.now();
        Instant expirationDate = expiration.toInstant();
        long secondsBetween = redisServiceUtil.expirationSecondGenerator(now,expirationDate);
        redisServiceUtil.setDateExpire(ip+"_Refresh",refreshToken,secondsBetween);

        return refreshToken;
    }

    private void saveMember(String email, List<String> authorities) {
        memberVerifier.verifyExistsEmail(email);
            Member member = new Member();
            String nickName = nickNameGenerator.randomNickNameGenerator(NickNameGenerator.adjectives,NickNameGenerator.animals);
            String password = passwordEncoder.encode((UUID.randomUUID().toString()));
            member.setPassword(password);
            member.setNickname(nickName);
            member.setEmail(email);
            member.setRoles(authorities);
            member.setNationality("MarbleUs");
            member.setBirth(LocalDate.now());
//            member.addProfilePic(pic);
            memberService.create(member);

    }
}
