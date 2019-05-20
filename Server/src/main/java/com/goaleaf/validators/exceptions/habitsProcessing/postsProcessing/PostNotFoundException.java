package com.goaleaf.validators.exceptions.habitsProcessing.postsProcessing;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


public class PostNotFoundException extends ResponseStatusException {
    public PostNotFoundException(HttpStatus status, final String message) {
        super(status, message);

    }
}
