package com.goaleaf.validators;

import com.goaleaf.entities.viewModels.RegisterViewModel;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator {

    public boolean isValid(RegisterViewModel model) {
        return model.password.equals(model.matchingPassword);
    }
}
