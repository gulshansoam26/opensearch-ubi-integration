package com.example.ubi_backend.service;

import com.example.ubi_backend.entity.Product;
import com.example.ubi_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getProducts(String search) {

        if (search == null || search.isBlank()) {
            return productRepository.findAll();
        }

        Optional<Product> product =
                productRepository.findByNameIgnoreCase(search);

        if (product.isPresent()) {
            return List.of(product.get());
        }

        return productRepository.findByCategoryIgnoreCase(search);
    }
}