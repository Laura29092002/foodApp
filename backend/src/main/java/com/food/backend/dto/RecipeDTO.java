package com.food.backend.dto;

public class RecipeDTO {
    private String name;
    private String image;

    public RecipeDTO() {
    }

    public RecipeDTO(String name, String image) {
        this.name = name;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}