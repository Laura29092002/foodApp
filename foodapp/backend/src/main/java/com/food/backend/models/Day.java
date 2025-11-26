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
    private int recipeLunchId;

    @Column(name = "recipe_dinner_id")
    private int recipeDinnerId;

    Day(int id, String name, int recipeLunchId, int recipeDinnerId) {
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

    public int getRecipeLunchId() {
        return recipeLunchId;
    }

    public void setRecipeLunchId(int recipeLunchId) {
        this.recipeLunchId = recipeLunchId;
    }

    public int getRecipeDinnerId() {
        return recipeDinnerId;
    }

    public void setRecipeDinnerId(int recipeDinnerId) {
        this.recipeDinnerId = recipeDinnerId;
    }
}