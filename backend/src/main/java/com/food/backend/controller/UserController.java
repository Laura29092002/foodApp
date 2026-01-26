package com.food.backend.controller;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.backend.models.LoginRequest;
import com.food.backend.models.User;
import com.food.backend.repository.UserRepository;
import com.food.backend.service.AuthService;



@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final AuthService authService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12); 

    public UserController(UserRepository userRepository, AuthService authService){
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        user.setMdp(encoder.encode(user.getMdp()));
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = authService.verifyUser(
            loginRequest.getMail(), 
            loginRequest.getMdp()
        );
        
        if (isValid) {
            return userRepository.findByMailUser(loginRequest.getMail());
        } else {
            return new User();
        }
    }
    
    
    @PutMapping
    public User updateUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
    
    

    
    
}
