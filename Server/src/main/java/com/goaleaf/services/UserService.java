package com.goaleaf.services;

import com.goaleaf.DTO.UserDto;
import com.goaleaf.entities.User;

import com.goaleaf.validators.exceptions.EmailExistsException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    Iterable<User> listAllUsers();

    User getUserById(Integer id);

    User saveUser(User user);

    void removeUser(Integer id);

    Boolean checkIfExists(Integer id);

    Iterable<User> listAllUsersPaging(Integer pageNr, Integer howManyOnPage);

    User registerNewUserAccount(UserDto accountDto) throws EmailExistsException;

    User findByUserName(String username);

    }
