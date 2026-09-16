package com.example.ubi_backend.service;

import com.example.ubi_backend.entity.Product;
import com.example.ubi_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final OpenSearchService openSearchService;

    public ProductServiceImpl(ProductRepository productRepository,OpenSearchService openSearchService) {
        this.productRepository = productRepository;
        this.openSearchService= openSearchService;
    }

    @Override
    public List<Product> getProducts(String search, String category) {

        boolean hasSearch = search != null && !search.isBlank();
        boolean hasCategory = category != null && !category.isBlank();

        List<Product> products;

        if (hasSearch && hasCategory) {
            products = productRepository
                    .findByNameContainingIgnoreCaseAndCategoryIgnoreCase(search, category);
        } else if (hasSearch) {
            products = productRepository.findByNameContainingIgnoreCase(search);
        } else if (hasCategory) {
            products = productRepository.findByCategoryIgnoreCase(category);
        } else {
            products = productRepository.findAll();
        }

        Map<Integer, Long> clickCounts = openSearchService.getClickCountsByProductId();

        products.sort((a, b) -> {
            long clicksA = clickCounts.getOrDefault(a.getId(), 0L);
            long clicksB = clickCounts.getOrDefault(b.getId(), 0L);
            return Long.compare(clicksB, clicksA);
        });

        return products;
    }

    @Override
    public List<String> getCategories() {

        List<Product> allProducts = productRepository.findAll();
        Set<String> uniqueCategories = new HashSet<>();

        for (Product product : allProducts) {
            uniqueCategories.add(product.getCategory());
        }

        return new ArrayList<>(uniqueCategories);
    }
}