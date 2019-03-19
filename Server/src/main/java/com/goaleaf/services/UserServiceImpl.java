package com.goaleaf.services;

import com.goaleaf.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.goaleaf.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<User> listAllUsersPaging(Integer pageNr, Integer howManyOnPage) {
        return userRepository.findAll(new PageRequest(pageNr, howManyOnPage));
    }

    @Override
    public Iterable<User> listAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void removeUser(Integer id) {
        userRepository.delete(id);
    }

    @Override
    public Boolean checkIfExists(Integer id) {
        if (userRepository.checkIfExists(id) > 0)
            return true;
        else
            return false;
    }
}
