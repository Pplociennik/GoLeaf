package com.goaleaf.DTO;

import com.goaleaf.validators.PasswordMatches;
import com.goaleaf.validators.ValidEmail;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

@PasswordMatches
public class UserDto {

    @NotNull
    @NotEmpty
    public String login;

    @NotNull
    @NotEmpty
    public String userName;

    @NotNull
    @NotEmpty
    public String password;
    public String matchingPassword;

    @ValidEmail
    @NotNull
    @NotEmpty
    public String emailAddress;


}
