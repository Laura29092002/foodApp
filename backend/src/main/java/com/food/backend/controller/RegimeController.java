package com.food.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.backend.models.Regime;
import com.food.backend.repository.RegimeRepository;


@RestController
@RequestMapping("/regime")
public class RegimeController {
    private final RegimeRepository regimeRepository;
    
    public RegimeController(RegimeRepository regimeRepository){
        this.regimeRepository = regimeRepository;
    }

    @GetMapping
    public ResponseEntity<List<Regime>> getAllRegimes() {
        List<Regime> regimes = regimeRepository.findAll();
        return ResponseEntity.ok(regimes);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Regime> getRegimeById(@PathVariable Integer id) {
        Optional<Regime> regime = regimeRepository.findById(id);
        return regime.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}
