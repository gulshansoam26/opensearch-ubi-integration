package com.example.ubi_backend.repository;

import com.example.ubi_backend.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository
        extends MongoRepository<Product, Integer> {

    Optional<Product> findByNameIgnoreCase(String name);

    List<Product> findByCategoryIgnoreCase(String category);
}