package com.goaleaf.engine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GoaLeafApplication {

    public static void main(String[] args) {
        ExceptionHandler exceptionHandler = new ExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler(exceptionHandler);

        SpringApplication.run(GoaLeafApplication.class, args);
    }

}
