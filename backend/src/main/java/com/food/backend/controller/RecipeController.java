package com.food.backend.controller;


import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.food.backend.models.FileStorageService;
import com.food.backend.models.Ingredients;
import com.food.backend.models.Recipe;
import com.food.backend.repository.RecipeRepository;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeRepository recipeRepository;
    private final FileStorageService fileStorageService;

    public RecipeController(RecipeRepository recipeRepository, FileStorageService fileStorageService) {
        this.recipeRepository = recipeRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return ResponseEntity.ok(recipes);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ingredients/{id}")
    public List<Ingredients> findIngredientsByRecipeId(@PathVariable int id) {
        return recipeRepository.findAllIngredientsByRecipeId(id);
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Recipe> save(
            @RequestParam() String name,
            @RequestParam(required = false) MultipartFile image) {
        
        Recipe recipe = new Recipe();
        recipe.setName(name);

        // Si une image est fournie, la sauvegarder
        if (image != null && !image.isEmpty()) {
            String imagePath = fileStorageService.storeFile(image, "recipes");
            recipe.setImage(imagePath);
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Recipe> updateRecipe(
            @PathVariable Integer id,
            @RequestParam() String name,
            @RequestParam(required = false) MultipartFile image) {
        
        Optional<Recipe> existingRecipe = recipeRepository.findById(id);
        
        if (existingRecipe.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Recipe recipe = existingRecipe.get();
        recipe.setName(name);

        // Si une nouvelle image est fournie
        if (image != null && !image.isEmpty()) {
            // Supprimer l'ancienne image si elle existe
            if (recipe.getImage() != null) {
                fileStorageService.deleteFile(recipe.getImage());
            }
            
            // Sauvegarder la nouvelle image
            String imagePath = fileStorageService.storeFile(image, "recipes");
            recipe.setImage(imagePath);
        }

        Recipe updatedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.ok(updatedRecipe);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Integer id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        
        if (recipe.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Supprimer l'image si elle existe
        if (recipe.get().getImage() != null) {
            fileStorageService.deleteFile(recipe.get().getImage());
        }
        recipeRepository.deleteIngredientsByRecipeId(id);
        recipeRepository.deleteStepsByRecipeId(id);
        recipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteIngredient/{id}")
    public ResponseEntity<Void> getMethodName(@PathVariable Integer id) {
        recipeRepository.deleteIngredientsByRecipeId(id);
        return ResponseEntity.noContent().build();
    }
    

    
    @GetMapping("/{id}/image")
    public ResponseEntity<Resource> getRecipeImage(@PathVariable Integer id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        
        if (recipe.isEmpty() || recipe.get().getImage() == null) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = fileStorageService.loadFileAsResource(recipe.get().getImage());
        
        String contentType = "image/jpeg";
        try {
            contentType = Files.probeContentType(Paths.get(resource.getURI()));
        } catch (Exception e) {
            // Utiliser le type par défaut
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, 
                        "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping("/{id_recipe}/{id_ingredient}/{quantity}")
    public ResponseEntity<Void> save(@PathVariable int id_recipe, @PathVariable int id_ingredient, @PathVariable BigDecimal quantity) {
        recipeRepository.addAllIngredientToRecipe(id_recipe, id_ingredient, quantity);
        return ResponseEntity.ok().build();
    }
}