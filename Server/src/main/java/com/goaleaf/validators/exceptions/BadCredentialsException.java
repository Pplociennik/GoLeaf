package com.goaleaf.validators.exceptions;

import javax.security.sasl.AuthenticationException;

public class BadCredentialsException extends AuthenticationException {
    public BadCredentialsException(final String message) {
        super(message);
    }
}
