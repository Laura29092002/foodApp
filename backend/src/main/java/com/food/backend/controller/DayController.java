package com.food.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.backend.models.Day;
import com.food.backend.repository.DayRepository;
@RestController
@RequestMapping("/day")
public class DayController {
    private final DayRepository dayRepository;


    public DayController(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    @GetMapping
    public List<Day> getDays() {
        return dayRepository.findAll();
    }

    @GetMapping("/{id}")
    public Day getByID(@PathVariable int id) {
        return dayRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Day addDay(@RequestBody Day day) {
        return dayRepository.save(day);
    }

    @PutMapping
    public Day updateDay(@RequestBody Day day) {
        return dayRepository.save(day);
    }

    @PutMapping("/{id}")
    public void changeRecipeIdValue(@PathVariable int id) {
        dayRepository.deleteRecipeDinnerFromDayByRecipeId(id);
        dayRepository.deleteRecipeLunchFromDayByRecipeId(id);
    }


    @DeleteMapping("{id}")
    public void deleteDay(@PathVariable int id) {
        dayRepository.deleteById(id);
    }
}