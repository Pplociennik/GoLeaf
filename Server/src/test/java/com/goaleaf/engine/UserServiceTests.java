package com.goaleaf.engine;

import com.goaleaf.controllers.AuthController;
import com.goaleaf.entities.DTO.UserDto;
import com.goaleaf.entities.viewModels.accountsAndAuthorization.LoginViewModel;
import com.goaleaf.entities.viewModels.accountsAndAuthorization.PasswordViewModel;
import com.goaleaf.services.UserService;
import com.goaleaf.validators.exceptions.accountsAndAuthorization.AccountNotExistsException;
import com.goaleaf.validators.exceptions.accountsAndAuthorization.EmailExistsException;
import com.goaleaf.validators.exceptions.accountsAndAuthorization.LoginExistsException;
import org.junit.Before;
import org.junit.Test;

import com.goaleaf.validators.exceptions.accountsAndAuthorization.BadCredentialsException;
import com.goaleaf.entities.viewModels.accountsAndAuthorization.RegisterViewModel;
import com.goaleaf.services.servicesImpl.UserServiceImpl;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.mail.MessagingException;

@RunWith(SpringRunner.class)
@WebAppConfiguration
public class UserServiceTests {

    private MockMvc mvc;
    private AuthController authController;
    private UserService userServiceImpl;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() throws Exception {
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Before
    public void PrepareTests() {
        authController = new AuthController();
        userServiceImpl = new UserServiceImpl();
    }

    @Test(expected = BadCredentialsException.class)
    public void whenEmailFormatWrong_thenBadCredentialsException() throws EmailExistsException, LoginExistsException, BadCredentialsException, MessagingException {

        RegisterViewModel model = new RegisterViewModel();
        model.login = "tester";
        model.userName = "tester";
        model.emailAddress = "email";
        model.password = "password";
        model.matchingPassword = "password";

        UserDto dto = userServiceImpl.registerNewUserAccount(model);

    }

    @Test(expected = LoginExistsException.class)
    public void whenLoginExists_thenLoginExistsException() throws EmailExistsException, LoginExistsException, BadCredentialsException, MessagingException {

        RegisterViewModel model = new RegisterViewModel();
        model.login = "tester";
        model.userName = "tester";
        model.emailAddress = "email@email.com";
        model.password = "password";
        model.matchingPassword = "password";

        RegisterViewModel model_new = new RegisterViewModel();
        model_new.login = "tester";
        model_new.userName = "user";
        model_new.emailAddress = "mail@mail.com";
        model_new.password = "password";
        model_new.matchingPassword = "password";

        UserDto dto = userServiceImpl.registerNewUserAccount(model);
        UserDto dto_new = userServiceImpl.registerNewUserAccount(model_new);

    }

    @Test(expected = BadCredentialsException.class)
    public void whenChangedPasswordsNotEqual_thenBadCredentialsException() throws BadCredentialsException, MessagingException, AccountNotExistsException {

        RegisterViewModel model = new RegisterViewModel();
        model.login = "tester";
        model.userName = "tester";
        model.emailAddress = "email@email.com";
        model.password = "password";
        model.matchingPassword = "password";

        UserDto dto = userServiceImpl.registerNewUserAccount(model);

        LoginViewModel loginViewModel = new LoginViewModel();
        loginViewModel.login = model.login;
        loginViewModel.password = model.password;

        String token = authController.login(loginViewModel);

        PasswordViewModel passwordViewModel = new PasswordViewModel();
        passwordViewModel.password = "mypassword";
        passwordViewModel.matchingPassword = "password";

        userServiceImpl.setNewPassword(passwordViewModel);

    }

}
