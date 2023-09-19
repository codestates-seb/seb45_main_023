package com.marbleUs.marbleUs.common.auth.config;





import com.marbleUs.marbleUs.common.auth.handler.CustomLogoutHandler;
import com.marbleUs.marbleUs.common.auth.filter.JwtAuthenticationFilter;
import com.marbleUs.marbleUs.common.auth.filter.JwtVerificationFilter;
import com.marbleUs.marbleUs.common.auth.handler.MemberAuthenticationEntryPoint;
import com.marbleUs.marbleUs.common.auth.handler.OAuth2memberSuccessHandler;
import com.marbleUs.marbleUs.common.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.common.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.common.redis.service.RedisServiceUtil;
import com.marbleUs.marbleUs.common.redis.tools.ClientIpExtractor;
import com.marbleUs.marbleUs.common.tools.generator.NickNameGenerator;
import com.marbleUs.marbleUs.common.tools.verifier.MemberVerifier;
import com.marbleUs.marbleUs.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {



    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final RedisServiceUtil redisServiceUtil;
    private final ClientIpExtractor extractor;
    private final MemberVerifier memberVerifier;
    private final NickNameGenerator nickNameGenerator;
    private final PasswordEncoder passwordEncoder;
    private final CustomLogoutHandler logoutHandler;






    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin() //h2 이용하기위한 설정
                .and()
                .csrf().disable()
//                .cors(withDefaults())
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint(jwtTokenizer,authorityUtils,redisServiceUtil,extractor))
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll()
//                        .antMatchers("/missions/**").permitAll()
//                        .antMatchers("/weather/**").permitAll()
//                        .antMatchers(HttpMethod.POST,"/members/signup").permitAll()
//                        .antMatchers(HttpMethod.GET,"/members").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.GET,"/blogs/cities/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.GET,"/cities").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.GET,"/cities/**").permitAll()
//                        .antMatchers(HttpMethod.POST,"/cities").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.DELETE,"/cities").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.PATCH,"/cities").hasRole("ADMIN")
//                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2.successHandler(new OAuth2memberSuccessHandler(jwtTokenizer,authorityUtils,memberService,redisServiceUtil,extractor,memberVerifier,nickNameGenerator,passwordEncoder)))
                .logout()
                .logoutUrl("/logout")
                .addLogoutHandler(new CustomLogoutHandler(redisServiceUtil,extractor))
                .logoutSuccessUrl("http://localhost:3000/"); //http://marbleus-s3.s3-website.ap-northeast-2.amazonaws.com/login
        return http.build();
    }




    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("chrome-extension://ggnhohnkfcpcanfekomdkjffnfcjnjam","http://jxy.me","http://localhost:3000","http://localhost:8080","http://marbleus-s3.s3-website.ap-northeast-2.amazonaws.com"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","OPTION"));
        configuration.addAllowedHeader("*");
        configuration.setExposedHeaders(Arrays.asList("*","Authorization"));
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,authorityUtils);

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, memberService,redisServiceUtil,extractor);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");  //기본 로그인 시도 주소 프론트에서 이 URL로 로그인을 시도한다.       //

            builder.addFilter(jwtAuthenticationFilter);
            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }



    }

}
