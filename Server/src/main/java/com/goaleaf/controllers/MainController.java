package com.goaleaf.controllers;

import com.goaleaf.entities.User;
import com.goaleaf.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@Component
public class MainController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String generateModel() {
        User user = new User(1, "defaultUser", "DefaultUser", "def", "def", "def@default.com");

        userService.saveUser(user);

        return "Generated default User!";
    }
}
