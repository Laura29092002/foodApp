package com.food.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.backend.models.Regime;

public interface RegimeRepository extends JpaRepository<Regime, Integer>{
    
}
