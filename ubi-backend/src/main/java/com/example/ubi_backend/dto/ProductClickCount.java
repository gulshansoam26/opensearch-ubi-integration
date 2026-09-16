package com.example.ubi_backend.dto;

public class ProductClickCount {

    private String productName;
    private long count;

    public ProductClickCount(String productName, long count) {
        this.productName = productName;
        this.count = count;
    }

    public String getProductName() {
        return productName;
    }

    public long getCount() {
        return count;
    }
}