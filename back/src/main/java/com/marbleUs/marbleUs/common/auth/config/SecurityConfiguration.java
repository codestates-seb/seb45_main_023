package com.marbleUs.marbleUs.common.auth.config;





import com.marbleUs.marbleUs.common.auth.filter.JwtAuthenticationFilter;
import com.marbleUs.marbleUs.common.auth.filter.JwtVerificationFilter;
import com.marbleUs.marbleUs.common.auth.handler.MemberAuthenticationEntryPoint;
import com.marbleUs.marbleUs.common.auth.handler.OAuth2memberSuccessHandler;
import com.marbleUs.marbleUs.common.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.common.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {


    //TODO:

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;





    @Bean//개발환경
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin() //h2 이용하기위한 설정
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint(jwtTokenizer,authorityUtils))
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2.successHandler(new OAuth2memberSuccessHandler(jwtTokenizer,authorityUtils,memberService)))
                .logout()
                .logoutSuccessUrl("http://localhost:3000");
        return http.build();
    }




    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:8080", "https://9129-116-126-166-12.ngrok-free.app","http://seb45-pre-015.s3-website.ap-northeast-2.amazonaws.com"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","OPTION"));
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("*");
        configuration.setMaxAge(3000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,authorityUtils);

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");  //기본 로그인 시도 주소 프론트에서 이 URL로 로그인을 시도한다.       // (2-5)

            builder.addFilter(jwtAuthenticationFilter);
            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }



    }

}
