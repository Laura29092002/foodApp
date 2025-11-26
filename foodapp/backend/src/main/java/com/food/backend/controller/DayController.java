package com.food.backend.controller;

import com.food.backend.models.Day;
import com.food.backend.repository.DayRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @DeleteMapping("{id}")
    public void deleteDay(@PathVariable int id) {
        dayRepository.deleteById(id);
    }
}