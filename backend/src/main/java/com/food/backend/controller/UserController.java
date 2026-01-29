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

import com.food.backend.models.Day;
import com.food.backend.models.LoginRequest;
import com.food.backend.models.User;
import com.food.backend.repository.DayRepository;
import com.food.backend.repository.UserRepository;
import com.food.backend.service.AuthService;



@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final DayRepository dayRepository;
    private final DayController dayController;
    private final AuthService authService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12); 

    public UserController(UserRepository userRepository, AuthService authService, DayRepository dayRepository, DayController dayController){
        this.userRepository = userRepository;
        this.authService = authService;
        this.dayRepository = dayRepository;
        this.dayController = dayController;
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
        User newUser = userRepository.save(user);
        List<String> nameDays = List.of("lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche");
        for (String nameDay : nameDays) {
            Day newDay = new Day(0, nameDay, newUser.getId(), null, null);
            dayController.addDay(newDay);
        }
        return newUser;
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = authService.verifyUser(
            loginRequest.getMail(), 
            loginRequest.getMdp()
        );
        
        if (isValid) {
            User newUser = userRepository.findByMailUser(loginRequest.getMail());
            newUser.setMdp("");
            return newUser;
        } else {
            return new User();
        }
    }

    @PostMapping("/inscription")
    public Boolean existingUser(@RequestBody String mail) {
        boolean isExisting = authService.verifyExistingUserByMail(mail);
        System.out.println(isExisting);
        return isExisting;
    }
    
    
    
    @PutMapping
    public User updateUser(@RequestBody User user) {
        User oldUser = getUserById(user.getId());
        user.setMdp(oldUser.getMdp());
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        dayRepository.deleteByUserId(id);
        userRepository.deleteById(id);
    }
    
    

    
    
}
