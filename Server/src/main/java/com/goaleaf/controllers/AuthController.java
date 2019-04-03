package com.goaleaf.controllers;

import com.auth0.jwt.JWT;
import com.goaleaf.entities.DTO.UserDto;
import com.goaleaf.entities.User;
import com.goaleaf.services.JwtService;
import com.goaleaf.services.UserService;
import com.goaleaf.validators.UserCredentialsValidator;
import com.goaleaf.validators.exceptions.AccountNotExistsException;
import com.goaleaf.validators.exceptions.BadCredentialsException;
import com.goaleaf.validators.exceptions.EmailExistsException;
import com.goaleaf.validators.exceptions.LoginExistsException;
import com.goaleaf.entities.viewModels.LoginViewModel;
import com.goaleaf.entities.viewModels.RegisterViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.goaleaf.security.SecurityConstants.EXPIRATION_TIME;
import static com.goaleaf.security.SecurityConstants.SECRET;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserCredentialsValidator userCredentialsValidator;
    @Autowired
    private JwtService jwtService;

    @PermitAll
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public UserDto registerUserAccount(@RequestBody RegisterViewModel register) throws EmailExistsException, LoginExistsException, BadCredentialsException {


        if (!userCredentialsValidator.isValidEmail(register))
            throw new BadCredentialsException("Wrong email format!");
        if (!userCredentialsValidator.isPasswordFormatValid(register))
            throw new BadCredentialsException("Password must be at least 6 characters long and cannot contain spaces!");
        if (!userCredentialsValidator.isValidPassword(register))
            throw new BadCredentialsException("Passwords are not equal!");

        register.password = (bCryptPasswordEncoder.encode(register.password));
        User user = userService.registerNewUserAccount(register);
        UserDto userDto = new UserDto();
        userDto.login = user.getLogin();
        userDto.emailAddress = user.getEmailAddress();
        userDto.password = user.getPassword();
        userDto.userName = user.getUserName();
        return userDto;

    }

    @PermitAll
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody LoginViewModel userModel) throws AccountNotExistsException, BadCredentialsException {

        if (userService.findByLogin(userModel.login) == null) {
            throw new AccountNotExistsException("Account with this login not exists!");
        }

        if (!bCryptPasswordEncoder.matches(userModel.password, userService.findByLogin(userModel.login).getPassword())) {
            throw new BadCredentialsException("Wrong Password!!");
        }
        String token = JWT.create()
                .withSubject(String.valueOf(userService.findByLogin(userModel.login).getId()))
//                .withSubject(userService.findByLogin(userModel.login).getLogin())
                .withClaim("Login", userService.findByLogin(userModel.login).getLogin())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        jwtService.Validate(token);

        return token;
    }
}
