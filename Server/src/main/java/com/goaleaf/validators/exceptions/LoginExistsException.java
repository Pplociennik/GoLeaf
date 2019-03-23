package com.goaleaf.validators.exceptions;

public class LoginExistsException extends Throwable {
    public LoginExistsException(final String message) {
        super(message);
    }
}
