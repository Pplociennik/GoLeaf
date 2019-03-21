package com.goaleaf.services;

import com.goaleaf.DTO.UserDto;
import com.goaleaf.entities.User;
import com.goaleaf.repositories.RoleRepository;
import com.goaleaf.validators.exceptions.EmailExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.goaleaf.repositories.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

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

    @Transactional
    @Override
    public User registerNewUserAccount(UserDto accountDto)
            throws EmailExistsException {

        if (emailExists(accountDto.getEmailAddress())) {
            throw new EmailExistsException("Istnieje już konto o takim adresie email!:" + accountDto.getEmailAddress());
        }
        User user = new User();
        user.setLogin(accountDto.getLogin());
        user.setUserName(accountDto.getUserName());
        user.setPassword(accountDto.getPassword());
        user.setEmailAddress(accountDto.getEmailAddress());
        return userRepository.save(user);
    }

    @Override
    public User findByUserName(String username) {
        return userRepository.findByUserName(username);
    }

    private boolean emailExists(String email) {
        User user = userRepository.findByEmailAddress(email);
        if (user != null) {
            return true;
        }
        return false;
    }
}
