package com.marbleUs.marbleUs.auth.handler;




import com.marbleUs.marbleUs.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class OAuth2memberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String profilePic = String.valueOf(oAuth2User.getAttributes().get("picture"));
        List<String> authorities = authorityUtils.createRoles(email);
//        saveMember(email, authorities, profilePic);


        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
        System.out.println("Member Sign Up Process 1 :: Member is created!:: " + email );
        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );


        redirect(request,response,email,authorities);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username,List<String> authorities) throws IOException{

        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);

        String uri = createURI(accessToken,refreshToken).toString();

        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
        System.out.println("Login Process 0. AccessToken & RefreshToken is created!::");
        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );

        getRedirectStrategy().sendRedirect(request,response,uri);


    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String,String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("seb45-pre-015.s3-website.ap-northeast-2.amazonaws.com")
                .path("/mytokens")//redirect 받기 위한 주소
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

    private String delegateRefreshToken(String username) {

        String subject = username;

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBasedSecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);
        return refreshToken;
    }

//    private void saveMember(String email, List<String> authorities, String pic) {
//        if (!memberService.existsEmail(email)) {
//            Member member = new Member();
//            member.setEmail(email);
//            member.setRoles(authorities);
//            member.setProfilePic(pic);
//            memberService.createMember(member);
//        }
//    }
}
