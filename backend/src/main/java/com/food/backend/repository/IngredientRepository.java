package com.food.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.food.backend.models.Ingredient;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    @Query("SELECT i FROM Ingredient i WHERE i.categoryId = :categoryId")
    public List<Ingredient> findByCategoryId(@Param("categoryId") int categoryId);
}