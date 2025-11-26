package com.food.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.food.backend.models.Step;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface StepRepository extends JpaRepository<Step, Integer> {
    @Query("SELECT s FROM Step s WHERE s.recipeId = :recipeId")
    public List<Step> findByRecipeId(@Param("recipeId") int recipeId);
}