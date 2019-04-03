package com.goaleaf.validators;


import com.goaleaf.entities.viewModels.RegisterViewModel;
import com.goaleaf.validators.exceptions.BadCredentialsException;

public class UserCredentialsValidator {

    private EmailValidator emailValidator;
    private PasswordMatchesValidator passwordMatchesValidator;

    public boolean validateEmail(RegisterViewModel model) {
        return emailValidator.isValid(model.emailAddress);
    }

    public boolean validatePasswords(RegisterViewModel model) {
        return passwordMatchesValidator.isValid(model);
    }

    public boolean isValidEmailAndPasswords(RegisterViewModel model) throws BadCredentialsException {
        if (!validateEmail(model))
            throw new BadCredentialsException("Wrong email address!");
        if (!validatePasswords(model))
            throw new BadCredentialsException("Passwords are not equals!");
        else
            return true;
    }
}
