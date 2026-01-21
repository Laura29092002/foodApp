package com.food.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.food.backend.models.User;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByMail(String mail);

    @Query("SELECT u FROM User u WHERE u.mail = :mail")
    public User findByMailUser(@Param("mail") String mail);
    
}
