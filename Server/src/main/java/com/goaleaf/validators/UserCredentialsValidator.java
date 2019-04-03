package com.goaleaf.validators;


import com.goaleaf.entities.viewModels.RegisterViewModel;


public class UserCredentialsValidator {

    private EmailValidator emailValidator = new EmailValidator();
    private PasswordMatchesValidator passwordMatchesValidator = new PasswordMatchesValidator();

    public boolean isValidEmail(RegisterViewModel model) {
        return emailValidator.isValid(model.emailAddress);
    }

    public boolean isValidPassword(RegisterViewModel model) {
        return passwordMatchesValidator.isValid(model);
    }

    public boolean isPasswordFormatValid(RegisterViewModel model) {
        if (model.password.length() < 6)
            return false;
        if (model.password.contains(" "))
            return false;

        return true;

    }

//    public boolean isEmailFormatValid(RegisterViewModel model) {
//        Pattern passwordPattern = Pattern.compile("([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$");
//        Matcher matcher = passwordPattern.matcher(model.emailAddress);
//
//        if (!matcher.matches())
//            return false;
//
//        return true;
//    }

//    public boolean isValidEmailAndPasswords(RegisterViewModel model) throws BadCredentialsException {
//        if (!isValidEmail(model))
//            throw new BadCredentialsException("Wrong email address!");
//        if (!isValidPassword(model))
//            throw new BadCredentialsException("Passwords are not equals!");
//        else
//            return true;
//    }
}
