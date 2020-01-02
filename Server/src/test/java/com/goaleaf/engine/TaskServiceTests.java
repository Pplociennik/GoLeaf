package com.goaleaf.engine;

import com.goaleaf.controllers.AuthController;
import com.goaleaf.controllers.HabitController;
import com.goaleaf.entities.DTO.CompleteTaskDTO;
import com.goaleaf.entities.DTO.HabitDTO;
import com.goaleaf.entities.DTO.TaskDTO;
import com.goaleaf.entities.DTO.UserDto;
import com.goaleaf.entities.Post;
import com.goaleaf.entities.User;
import com.goaleaf.entities.enums.Category;
import com.goaleaf.entities.enums.Frequency;
import com.goaleaf.entities.viewModels.TaskViewModel;
import com.goaleaf.entities.viewModels.accountsAndAuthorization.LoginViewModel;
import com.goaleaf.entities.viewModels.accountsAndAuthorization.RegisterViewModel;
import com.goaleaf.entities.viewModels.habitsCreating.HabitViewModel;
import com.goaleaf.repositories.UserRepository;
import com.goaleaf.services.TaskService;
import com.goaleaf.services.UserService;
import com.goaleaf.services.servicesImpl.TaskServiceImpl;
import com.goaleaf.services.servicesImpl.UserServiceImpl;
import com.goaleaf.validators.exceptions.accountsAndAuthorization.AccountNotExistsException;
import com.goaleaf.validators.exceptions.accountsAndAuthorization.BadCredentialsException;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.context.WebApplicationContext;

import javax.mail.MessagingException;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
@AutoConfigureMockRestServiceServer
@RunWith(SpringJUnit4ClassRunner.class)
public class TaskServiceTests {

    @Autowired
    private AuthController authController;
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;
    @Autowired
    private HabitController habitController;
    @Autowired
    private UserRepository userRepository;

    private Set<User> toClean;

    @Before
    public void prepare() {
        this.toClean = new HashSet<>(0);
    }

    @After
    public void clean() {
        this.toClean.forEach(user -> userRepository.delete(user));
    }

    @Test
    public void whenTaskCompleted_thenOK() throws BadCredentialsException, MessagingException, AccountNotExistsException {

        RegisterViewModel model = new RegisterViewModel();
        model.login = "tester";
        model.userName = "tester";
        model.emailAddress = "email@email.com";
        model.password = "password";
        model.matchingPassword = "password";

        UserDto dto = userService.registerNewUserAccount(model);

        this.toClean.add(userRepository.findByLogin(model.login));

        LoginViewModel loginViewModel = new LoginViewModel();
        loginViewModel.login = model.login;
        loginViewModel.password = model.password;

        String token = authController.login(loginViewModel);

        HabitViewModel habitViewModel = new HabitViewModel();
        habitViewModel.title = "habit";
        habitViewModel.category = Category.HEALTH;
        habitViewModel.isPrivate = false;
        habitViewModel.startDate = new Date();
        habitViewModel.token = token;
        habitViewModel.canUsersInvite = true;
        habitViewModel.frequency = Frequency.Once;

        HabitDTO habitDTO = habitController.createNewHabit(habitViewModel);

        TaskDTO taskDTO = new TaskDTO(token, habitDTO.id, "task", 4, Frequency.Once, null, 1);
        TaskViewModel taskViewModel = taskService.saveTask(taskDTO);

        CompleteTaskDTO completeTaskDTO = new CompleteTaskDTO(habitDTO.id, token, taskViewModel.getId(), "");
        Post post = taskService.completeTask(completeTaskDTO);

        assertNotNull(post);
    }

}
