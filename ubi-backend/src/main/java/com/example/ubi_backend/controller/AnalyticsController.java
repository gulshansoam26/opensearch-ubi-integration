package com.example.ubi_backend.controller;

import com.example.ubi_backend.dto.CategoryFilterCount;
import com.example.ubi_backend.dto.KeywordCount;
import com.example.ubi_backend.dto.ProductClickCount;
import com.example.ubi_backend.service.OpenSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    private final OpenSearchService openSearchService;

    public AnalyticsController(OpenSearchService openSearchService) {
        this.openSearchService = openSearchService;
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Long>> getSummary() {
        return ResponseEntity.ok(
                openSearchService.getSummary()
        );
    }

    @GetMapping("/top-queries")
    public ResponseEntity<List<KeywordCount>> getTopQueries(
            @RequestParam(defaultValue = "5") int size
    ) {
        int safeSize = Math.min(size, 50);
        return ResponseEntity.ok(
                openSearchService.getTopQueries(safeSize)
        );
    }

    @GetMapping("/top-clicked-products")
    public ResponseEntity<List<ProductClickCount>> getTopClickedProducts(
            @RequestParam(defaultValue = "5") int size) {

        int safeSize = Math.min(size, 50);

        return ResponseEntity.ok(
                openSearchService.getTopClickedProducts(safeSize)
        );
    }

    @GetMapping("/top-filtered-categories")
    public ResponseEntity<List<CategoryFilterCount>> getTopFilteredCategories(
            @RequestParam(defaultValue = "5") int size) {

        int safeSize = Math.min(size, 50);

        return ResponseEntity.ok(
                openSearchService.getTopFilteredCategories(safeSize)
        );
    }
}