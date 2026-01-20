package com.food.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "day")
public class Day {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "recipe_lunch_id")
    private Integer recipeLunchId;

    @Column(name = "recipe_dinner_id")
    private Integer recipeDinnerId;

    Day(int id, String name, Integer recipeLunchId, Integer recipeDinnerId) {
        this.id = id;
        this.name = name;
        this.recipeLunchId = recipeLunchId;
        this.recipeDinnerId = recipeDinnerId;
    }

    public Day() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRecipeLunchId() {
        return recipeLunchId;
    }

    public void setRecipeLunchId(Integer recipeLunchId) {
        this.recipeLunchId = recipeLunchId;
    }

    public Integer getRecipeDinnerId() {
        return recipeDinnerId;
    }

    public void setRecipeDinnerId(Integer recipeDinnerId) {
        this.recipeDinnerId = recipeDinnerId;
    }
}