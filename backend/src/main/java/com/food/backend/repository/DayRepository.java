package com.food.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.food.backend.models.Day;

public interface DayRepository extends JpaRepository<Day, Integer> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE day SET recipe_lunch_id = null WHERE recipe_lunch_id = :id", nativeQuery = true)
    void deleteRecipeLunchFromDayByRecipeId(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE day SET recipe_dinner_id = null WHERE recipe_dinner_id = :id", nativeQuery = true)
    void deleteRecipeDinnerFromDayByRecipeId(@Param("id") Integer id);

    @Query("SELECT d FROM Day d WHERE d.userId = :userId")
    public List<Day> findByUserId(@Param("userId") int userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM day WHERE user_id = :id", nativeQuery = true)
    void deleteByUserId(@Param("id") Integer id);
}