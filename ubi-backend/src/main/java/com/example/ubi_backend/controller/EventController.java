package com.example.ubi_backend.controller;

import com.example.ubi_backend.dto.UBIEvent;
import com.example.ubi_backend.service.OpenSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final OpenSearchService openSearchService;

    public EventController(OpenSearchService openSearchService) {
        this.openSearchService = openSearchService;
    }

    @PostMapping
    public ResponseEntity<String> receiveEvent(
            @RequestBody UBIEvent event) {

        System.out.println("Received Event:");
        System.out.println(event);

        openSearchService.saveEvent(event);

        return ResponseEntity.ok("Event received and stored");
    }

    @GetMapping("/analytics/summary")
    public ResponseEntity<String> getSummary() {

        return ResponseEntity.ok(
                openSearchService.getSummary()
        );
    }
}