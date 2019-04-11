package com.goaleaf.controllers;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.goaleaf.entities.DTO.HabitDTO;
import com.goaleaf.entities.Habit;
import com.goaleaf.entities.viewModels.habitsCreating.HabitViewModel;
import com.goaleaf.services.HabitService;
import com.goaleaf.services.JwtService;
import com.goaleaf.validators.HabitNameValidator;
import com.goaleaf.validators.exceptions.habitsCreating.NoCategoryException;
import com.goaleaf.validators.exceptions.habitsCreating.NoFrequencyException;
import com.goaleaf.validators.exceptions.habitsCreating.NoPrivacyException;
import com.goaleaf.validators.exceptions.habitsCreating.WrongTitleException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;

import static com.goaleaf.security.SecurityConstants.*;


@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:3000")
public class HabitController {

    @Autowired
    private HabitService habitService;
    @Autowired
    private JwtService jwtService;

    private HabitNameValidator habitNameValidator = new HabitNameValidator();


    @RequestMapping(method = RequestMethod.POST, value = "/new-habit")
    public HabitDTO createNewHabit(@RequestBody HabitViewModel model) throws WrongTitleException, NoPrivacyException, NoFrequencyException, NoCategoryException {

        if (!habitNameValidator.isValid(model.title))
            throw new WrongTitleException("Habit's title must be at least 5 and no more than 50 characters long!");
        if (model.category == null)
            throw new NoCategoryException("You have to choose category!");
        if (model.frequency == null)
            throw new NoFrequencyException("You have to choose frequency!");
        if (model.isPrivate == null)
            throw new NoPrivacyException("You have to choose privacy!");
        if (!jwtService.Validate(model.token, SECRET))
            throw new TokenExpiredException("You have to be logged in to create a habit!");

        HabitDTO habitDTO = new HabitDTO();
        habitDTO.category = model.category;
        habitDTO.frequency = model.frequency;
        habitDTO.members = model.members;
        habitDTO.startDate = model.startDate;
        habitDTO.isPrivate = model.isPrivate;
        habitDTO.title = model.title;

        habitService.registerNewHabit(model);

        return habitDTO;
    }

    @PermitAll
    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Habit> list(/*String token*/) {

        return habitService.listAllHabits();
    }

}
