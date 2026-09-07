package com.example.ubi_backend.service;

import com.example.ubi_backend.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts(String search);
}
