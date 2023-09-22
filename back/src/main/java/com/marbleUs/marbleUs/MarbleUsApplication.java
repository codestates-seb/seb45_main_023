package com.marbleUs.marbleUs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.TimeZone;

@Slf4j
@EnableJpaAuditing
@SpringBootApplication
@EnableCaching
@EnableScheduling
public class MarbleUsApplication {

	public static void main(String[] args) {

		SpringApplication.run(MarbleUsApplication.class, args);
		log.info("실행되었습니다. {}", LocalDateTime.now());
	}

	@PostConstruct
	public void setTimeZone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

}
