package com.goaleaf.controllers;

import com.goaleaf.entities.User;
import com.goaleaf.repositories.UserRepository;
import com.goaleaf.services.JwtService;
import com.goaleaf.services.UserService;
import com.goaleaf.validators.UserCredentialsValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@Component
@PermitAll
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserCredentialsValidator userCredentialsValidator;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //to listing all users
    @PermitAll
    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<User> list(/*String token*/) {
//        jwtService.Validate(token);
//        userService.saveUser(new User(1, "defaultUser", "DefaultUser", "def", "def", "def@default.com"));
        return userService.listAllUsers();
    }

    //to listing all users paging
    @RequestMapping(value = "/{page}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<User> list(@PathVariable("page") Integer pageNr, @RequestParam("size") Optional<Integer> howManyOnPage) {
        return userService.listAllUsersPaging(pageNr, howManyOnPage.orElse(2));
    }

    //to getting one specified user by id
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public User getByPublicId(@PathVariable("id") Integer publicId) {
        return userService.getUserById(publicId);
    }

    //to getting user by id
//    @RequestMapping(value = "/user", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public User getByParamPublicId(@RequestParam("id") Integer publicId) {
//        return userService.getUserById(publicId);
//    }


    //to editing user in database
    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    public ResponseEntity<Void> edit(@RequestBody @Valid @NotNull User user) {
        if (!userService.checkIfExists(user.getId()))
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        else {
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }

    //to removing user from database
//    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
//    public ResponseEntity<User> delete(@PathVariable Integer id) {
//        userService.removeUser(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

}
