package com.example.ubi_backend.dto;

public class CategoryFilterCount {

    private String category;
    private long count;

    public CategoryFilterCount(String category, long count) {
        this.category = category;
        this.count = count;
    }

    public String getCategory() {
        return category;
    }

    public long getCount() {
        return count;
    }
}