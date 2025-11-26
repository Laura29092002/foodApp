package com.food.backend.controller;
import com.food.backend.models.Step;
import com.food.backend.repository.StepRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/step")
public class StepController {

    private final StepRepository stepRepository;

    public StepController(StepRepository stepRepository) {
        this.stepRepository = stepRepository;
    }

    @GetMapping
    public List<Step> getSteps() {
        return stepRepository.findAll();
    }

    @GetMapping("/{id}")
    public Step getStep(@PathVariable int id) {
        return stepRepository.findById(id).orElse(null);
    }

    @GetMapping("recipe/{id}")
    public List<Step> getStepsByRecipe(@PathVariable int id) {
        return stepRepository.findByRecipeId(id);
    }

    @PutMapping
    public Step updateStep(@RequestBody Step step) {
        return stepRepository.save(step);
    }

    @PostMapping
    public Step addStep(@RequestBody Step step) {
        return stepRepository.save(step);
    }

    @DeleteMapping("/{id}")
    public void deleteStep(@PathVariable int id) {
        stepRepository.deleteById(id);
    }
}