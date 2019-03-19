package com.goaleaf;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@EnableJpaRepositories("com.goaleaf.repositories")
@EnableSwagger2
@SpringBootApplication
public class GoaLeafApplication extends SpringBootServletInitializer {

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select().apis(RequestHandlerSelectors.basePackage("com.goaleaf.controllers"))
                .build();
    }

    public static void main(String[] args) {
        ExceptionHandler exceptionHandler = new ExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler(exceptionHandler);

        SpringApplication.run(GoaLeafApplication.class, args);
    }

}
