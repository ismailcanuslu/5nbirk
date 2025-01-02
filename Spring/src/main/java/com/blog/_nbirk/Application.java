package com.blog._nbirk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.blog._nbirk.repos")
@EntityScan(basePackages = "com.blog._nbirk.entities")
public class Application {

	public static void main(String[] args) {
		System.out.println("  5    N   N  BBBB   III  RRRR   K   K");
		System.out.println("  5    NN  N  B   B   I   R   R  K  K ");
		System.out.println("  5    N N N  BBBB    I   RRRR   KKK  ");
		System.out.println("  5    N  NN  B   B   I   R  R   K  K ");
		System.out.println("  5    N   N  BBBB   III  R   R  K   K");


		SpringApplication.run(Application.class, args);
		System.out.println("Application has started. JAVA 21 SpringBoot");
		System.out.println("Author:İsmailcan Uslu");
		System.out.println("Signed:10.11.2024-10.07.36");
	}

}
