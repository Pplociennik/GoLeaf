package com.goaleaf.validators.exceptions.habitsProcessing.postsProcessing.commentsProcessing;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CommentNotFoundException extends ResponseStatusException {
    public CommentNotFoundException(HttpStatus status, final String message) {
        super(status, message);
    }
}
