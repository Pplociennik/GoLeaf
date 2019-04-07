package com.goaleaf.validators.exceptions;

import javax.security.auth.login.AccountNotFoundException;

public class AccountNotExistsException extends AccountNotFoundException {
    public AccountNotExistsException(final String message) {
        super(message);
    }
}
