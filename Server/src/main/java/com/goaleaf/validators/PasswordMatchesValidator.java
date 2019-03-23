package com.goaleaf.validators;

import com.goaleaf.entities.viewModels.RegisterViewModel;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator
        implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        RegisterViewModel user = (RegisterViewModel) obj;
        return user.password.equals(user.matchingPassword);
    }
}
