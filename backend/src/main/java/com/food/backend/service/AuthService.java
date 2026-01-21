package com.food.backend.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.backend.models.User;
import com.food.backend.repository.UserRepository;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    public boolean verifyUser(String mail, String password) {
        Optional<User> user = userRepository.findByMail(mail);
        
        if (user.isPresent()) {
            return user.get().getMdp().equals(password);
        }
        return false;
    }
}