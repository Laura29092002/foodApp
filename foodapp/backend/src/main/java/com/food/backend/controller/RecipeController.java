package com.food.backend.controller;


import com.food.backend.models.Ingredients;
import com.food.backend.models.Recipe;
import com.food.backend.repository.RecipeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }
    @GetMapping("/{id}")
    public Recipe findById(@PathVariable int id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @GetMapping("/ingredients/{id}")
    public List<Ingredients> findIngredientsByRecipeId(@PathVariable int id) {
        return recipeRepository.findAllIngredientsByRecipeId(id);
    }

    @PostMapping
    public Recipe save(@RequestBody Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @PutMapping
    public Recipe update(@RequestBody Recipe recipe) {
        return recipeRepository.save(recipe);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        recipeRepository.deleteById(id);
    }

    @PostMapping("/{id_recipe}/{id_ingredient}/{quantity}")
    public void save(@PathVariable int id_recipe, @PathVariable int id_ingredient, @PathVariable int quantity) {
        recipeRepository.addAllIngredientToRecipe(id_recipe, id_ingredient, quantity);
    }
}