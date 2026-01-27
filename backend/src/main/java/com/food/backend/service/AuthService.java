package com.food.backend.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.food.backend.models.User;
import com.food.backend.repository.UserRepository;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    public boolean verifyUser(String mail, String password) {
        Optional<User> user = userRepository.findByMail(mail);
        
        if (user.isPresent()) {
            return encoder.matches(password, user.get().getMdp());
        }
        return false;
    }

    public boolean verifyExistingUserByMail(String mail) {
        Optional<User> user = userRepository.findByMail(mail);
        return user.isPresent();
    }


}