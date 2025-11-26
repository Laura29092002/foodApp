package com.food.backend.controller;


import com.food.backend.models.Ingredient;
import com.food.backend.models.Step;
import com.food.backend.repository.IngredientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredient")
public class IngredientController {
    private final IngredientRepository ingredientRepository;

    public IngredientController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping
    public List<Ingredient> getIngredients() {
        return ingredientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Ingredient getIngredient(@PathVariable int id) {
        return ingredientRepository.findById(id).orElse(null);
    }
    @PostMapping
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }
    @PutMapping
    public Ingredient updateIngredient(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }
    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable int id) {
        ingredientRepository.deleteById(id);
    }

    @GetMapping("/category/{id}")
    public List<Ingredient> getIngredientsByCategory(@PathVariable int id) {
        return ingredientRepository.findByCategoryId(id);
    }
}