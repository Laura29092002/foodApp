package com.food.backend.repository;

import com.food.backend.models.Ingredients;
import com.food.backend.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    @Query(value = "SELECT i.id, i.name, i.image, i.category_id, i.unit, CAST(r.quantity AS VARCHAR) " +
            "FROM recipe_to_ingredient r " +
            "INNER JOIN ingredient i ON i.id = r.ingredient_id " +
            "WHERE r.recipe_id = :id",
            nativeQuery = true)
    List<Ingredients> findAllIngredientsByRecipeId(@Param("id") Integer id);

    @Query(value = "INSERT INTO recipe_to_ingredient(recipe_id, ingredient_id, quantity) VALUES(:id_recipe,:id_ingredient, :quantity)", nativeQuery = true)
    void addAllIngredientToRecipe(@Param("id_recipe")  Integer recipeId, @Param("id_ingredient") Integer ingredientId, @Param("quantity") Integer quantity);
}