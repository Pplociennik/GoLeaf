package com.goaleaf.controllers;

import com.goaleaf.DTO.UserDto;
import com.goaleaf.entities.User;
import com.goaleaf.services.UserService;
import com.goaleaf.validators.UserValidator;
import com.goaleaf.validators.exceptions.EmailExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@Component
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserValidator userValidator;

    //to listing all users
    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<User> list(Model model) {
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

    //to creating registration form
    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String showRegistrationForm(WebRequest request, Model model) {
        UserDto userDTO = new UserDto();
        model.addAttribute("user", userDTO);
        return "registration";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ModelAndView registerUserAccount(
            @ModelAttribute("user") @Valid UserDto accountDto,
            BindingResult result,
            WebRequest request,
            Errors errors) {

        User registered = new User();
        if (!result.hasErrors()) {
            registered = createUserAccount(accountDto, result);
        }
        if (registered == null) {
            result.rejectValue("email", "message.regError");
        }
        if (result.hasErrors()) {
            return new ModelAndView("registration", "user", accountDto);
        } else {
            return new ModelAndView("successRegister", "user", accountDto);
        }
    }

    private User createUserAccount(UserDto accountDto, BindingResult result) {
        User registered = null;
        try {
            registered = userService.registerNewUserAccount(accountDto);
        } catch (EmailExistsException e) {
            e.printStackTrace();
        }
        return registered;
    }

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
