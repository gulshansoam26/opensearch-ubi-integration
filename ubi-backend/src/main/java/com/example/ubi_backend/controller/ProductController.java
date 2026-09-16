package com.example.ubi_backend.controller;

import com.example.ubi_backend.entity.Product;
import com.example.ubi_backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts(
            @RequestParam(required = false) String search,@RequestParam(required = false) String category) {

        return productService.getProducts(search,category);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return productService.getCategories();
    }
}