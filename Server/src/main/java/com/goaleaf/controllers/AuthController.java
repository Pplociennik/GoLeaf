package com.goaleaf.controllers;

import com.auth0.jwt.JWT;
import com.goaleaf.DTO.UserDto;
import com.goaleaf.entities.User;
import com.goaleaf.services.UserService;
import com.goaleaf.validators.exceptions.EmailExistsException;
import com.goaleaf.viewModels.LoginViewModel;
import com.goaleaf.viewModels.RegisterViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.goaleaf.security.SecurityConstants.EXPIRATION_TIME;
import static com.goaleaf.security.SecurityConstants.SECRET;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PermitAll
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public UserDto registerUserAccount(@RequestBody RegisterViewModel register) throws EmailExistsException {
        register.password = (bCryptPasswordEncoder.encode(register.password));
        User user = userService.registerNewUserAccount(register);
        UserDto userDto = new UserDto();
        userDto.login = user.getLogin();
        userDto.emailAddress = user.getEmailAddress();
        userDto.password = user.getPassword();
        userDto.userName = user.getUserName();
        userDto.userId = user.getUserID();
        return userDto;

    }

    @PermitAll
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody LoginViewModel userModel) {
        String token = JWT.create()
                .withSubject(userService.findByLogin(userModel.login).getLogin())
                .withClaim("Email", userService.findByLogin(userModel.login).getEmailAddress())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));

        return token;
    }
}
