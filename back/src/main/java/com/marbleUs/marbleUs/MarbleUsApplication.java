package com.marbleUs.marbleUs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@EnableCaching
public class MarbleUsApplication {

	public static void main(String[] args) {


		SpringApplication.run(MarbleUsApplication.class, args);
	}

}
