package com.food.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.food.backend.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {}