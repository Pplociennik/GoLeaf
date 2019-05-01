package com.goaleaf.controllers;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.goaleaf.entities.DTO.HabitDTO;
import com.goaleaf.entities.Habit;
import com.goaleaf.entities.Member;
import com.goaleaf.entities.User;
import com.goaleaf.entities.viewModels.habitsCreating.AddMemberViewModel;
import com.goaleaf.entities.viewModels.habitsCreating.HabitViewModel;
import com.goaleaf.services.HabitService;
import com.goaleaf.services.JwtService;
import com.goaleaf.services.MemberService;
import com.goaleaf.services.UserService;
import com.goaleaf.validators.HabitTitleValidator;
import com.goaleaf.validators.exceptions.accountsAndAuthorization.AccountNotExistsException;
import com.goaleaf.validators.exceptions.habitsCreating.*;
import com.goaleaf.validators.exceptions.habitsProcessing.HabitNotExistsException;
import com.goaleaf.validators.exceptions.habitsProcessing.UserAlreadyInHabitException;
import com.goaleaf.validators.exceptions.habitsProcessing.UserNotInHabitException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;

import java.nio.charset.StandardCharsets;

import static com.goaleaf.security.SecurityConstants.*;


@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:3000")
public class HabitController {

    @Autowired
    private HabitService habitService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private MemberService memberService;

    private HabitTitleValidator habitTitleValidator = new HabitTitleValidator();


    @RequestMapping(method = RequestMethod.POST, value = "/new-habit")
    public HabitDTO createNewHabit(@RequestBody HabitViewModel model) throws WrongTitleException, NoPrivacyException, NoFrequencyException, NoCategoryException {

        if (!habitTitleValidator.isValid(model.title))
            throw new WrongTitleException("Habit's title must be at least 5 and no more than 50 characters long!");
        if (model.category == null)
            throw new NoCategoryException("You have to choose category!");
        if (model.frequency == null)
            throw new NoFrequencyException("You have to choose frequency!");
        if (model.isPrivate == null)
            throw new NoPrivacyException("You have to choose privacy!");
        if (!jwtService.Validate(model.token, SECRET))
            throw new TokenExpiredException("You have to be logged in to create a habit!");

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(model.token).getBody();

        HabitDTO habitDTO = new HabitDTO();
        habitDTO.category = model.category;
        habitDTO.frequency = model.frequency;
//        habitDTO.members = model.members;
        habitDTO.startDate = model.startDate;
        habitDTO.isPrivate = model.isPrivate;
        habitDTO.title = model.title;
        habitDTO.creatorID = Integer.parseInt(claims.getSubject());

        habitService.registerNewHabit(model, Integer.parseInt(claims.getSubject()));

        return habitDTO;
    }

    @PermitAll
    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Habit> list(/*String token*/) {

        return habitService.listAllHabits();
    }

    @PermitAll
    @RequestMapping(value = "/getHabit/{id}", method = RequestMethod.GET)
    public Habit getHabitById(Integer id) {
        if (habitService.findById(id) == null)
            throw new HabitNotExistsException("Habit does not exist!");

        return habitService.findById(id);
    }

    @RequestMapping(value = "/addmember", method = RequestMethod.POST)
    public HttpStatus addMemberByLogin(@RequestBody AddMemberViewModel model) throws AccountNotExistsException {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(model.token).getBody();

        if (!jwtService.Validate(model.token, SECRET)) {
            throw new TokenExpiredException("You have to be logged in to invite users!");
        }
        if (!memberService.checkIfExist(new Member(Integer.parseInt(claims.getSubject()), model.habitID)))
            throw new UserNotInHabitException("You are only allowed to invite users to habits you are involved in!");


        if (habitService.findById(model.habitID) == null)
            throw new HabitNotExistsException("Habit with this id does not exist!");
        if (userService.findByLogin(model.userLogin) == null)
            throw new AccountNotExistsException("User with this login does not exist!");

        User searchingUser = userService.findByLogin(model.userLogin);

        Member newMember = new Member();
        newMember.setUserID(searchingUser.getId());
        newMember.setHabitID(model.habitID);

        if (memberService.checkIfExist(newMember))
            throw new UserAlreadyInHabitException("User already participate!");

        memberService.saveMember(newMember);
        return HttpStatus.OK;
    }

    @RequestMapping(value = "/removemember", method = RequestMethod.DELETE)
    public HttpStatus removeMemberFromDatabase(@PathVariable Integer habitID, @PathVariable Integer userID) {
        if (habitService.findById(habitID) == null)
            throw new HabitNotExistsException("Habit does not exist!");

        memberService.removeMemberById(habitID, userID);
        return HttpStatus.OK;
    }


    @RequestMapping(value = "/habit/members", method = RequestMethod.GET)
    public Iterable<Member> getAllHabitMembers(Integer habitID) {
        if (!habitService.checkIfExists(habitID))
            throw new HabitNotExistsException("Habit does not exist!");

        return memberService.getAllByHabitID(habitID);
    }

    @RequestMapping(value = "/habit/countmembers", method = RequestMethod.GET)
    public Integer countAllHabitMembers(Integer habitID) {
        if (habitService.findById(habitID) == null)
            throw new HabitNotExistsException("Habit with given id does not exist!");

        return memberService.countAllHabitMembers(habitID);
    }

}
