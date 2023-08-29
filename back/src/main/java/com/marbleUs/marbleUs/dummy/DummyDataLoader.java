package com.marbleUs.marbleUs.dummy;


import com.marbleUs.marbleUs.auth.jwt.JwtTokenizer;
import com.marbleUs.marbleUs.auth.utils.CustomAuthorityUtils;
import com.marbleUs.marbleUs.member.entity.Member;
import com.marbleUs.marbleUs.member.repository.MemberRepository;
import com.marbleUs.marbleUs.systemUtils.MemberNickNameGenerator;
import com.marbleUs.marbleUs.systemUtils.NickNameGenerator;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

//import lombok.AllArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//더미생성용 클래스 입니다, 사용시 퀘스쳔 생성자를 주석해제해야 합니다
@Component
@AllArgsConstructor
public class DummyDataLoader implements CommandLineRunner {


  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;
  private final CustomAuthorityUtils authorityUtils;
  private final MemberNickNameGenerator nickNameGenerator;



  @Override
  public void run(String... args) throws Exception {


      List<String> roles = authorityUtils.createRoles("test@gmail.com");

      String encryptedPassword = passwordEncoder.encode("testPassword123");

      String nickName = nickNameGenerator.randomNickNameGenerator(NickNameGenerator.adjectives,NickNameGenerator.animals);


      LocalDate birthDate =  LocalDate.now();
      Member member1 = new Member();
      member1.setEmail("test@gmail.com");
      member1.setPassword(encryptedPassword);
      member1.setRoles(roles);
      member1.setNickname(nickName);
      member1.setNationality("대힌민국");
      member1.setBirth(birthDate);





    // 더미 데이터 저장
    memberRepository.save(member1);

  }
}
