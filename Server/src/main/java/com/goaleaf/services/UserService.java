package com.goaleaf.services;

import com.goaleaf.entities.User;

import com.goaleaf.validators.exceptions.EmailExistsException;
import com.goaleaf.validators.exceptions.LoginExistsException;
import com.goaleaf.entities.viewModels.RegisterViewModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    Iterable<User> listAllUsers();

    User getUserById(Integer id);

    User saveUser(User user);

    void removeUser(Integer id);

    Boolean checkIfExists(Integer id);

    Iterable<User> listAllUsersPaging(Integer pageNr, Integer howManyOnPage);

    User registerNewUserAccount(RegisterViewModel register) throws EmailExistsException, LoginExistsException;

   // User findByUserName(String username);

    User findByLogin(String user);

    }
