package com.food.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.food.backend.models.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    @Query("SELECT i FROM Ingredient i WHERE i.categoryId = :categoryId")
    public List<Ingredient> findByCategoryId(@Param("categoryId") int categoryId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM recipe_to_ingredient WHERE ingredient_id = :id", nativeQuery = true)
    void deleteByIngredientId(@Param("id") Integer id);
}