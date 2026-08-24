package com.example.ubi_backend.controller;

import com.example.ubi_backend.dto.UBIEvent;
import com.example.ubi_backend.service.OpenSearchService;
import com.example.ubi_backend.validation.UBISchemaValidator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.ValidationMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final OpenSearchService openSearchService;
    private final UBISchemaValidator ubiSchemaValidator;


    public EventController(
            OpenSearchService openSearchService,
            UBISchemaValidator ubiSchemaValidator) {

        this.openSearchService = openSearchService;
        this.ubiSchemaValidator = ubiSchemaValidator;
    }

    @PostMapping
    public ResponseEntity<?> receiveEvent(
            @RequestBody String eventJson) {

        System.out.println("Received Event:");
        System.out.println(eventJson);

        try {

            Set<ValidationMessage> errors =
                    ubiSchemaValidator.validate(eventJson);

            System.out.println("Validation errors: " + errors);

            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(errors);
            }

            ObjectMapper objectMapper = new ObjectMapper();

            UBIEvent ubiEvent =
                    objectMapper.readValue(eventJson, UBIEvent.class);

            openSearchService.saveEvent(ubiEvent);

            return ResponseEntity.ok(
                    "Event received and stored"
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body("Invalid event: " + e.getMessage());
        }
    }

    @GetMapping("/analytics/summary")
    public ResponseEntity<String> getSummary() {

        return ResponseEntity.ok(
                openSearchService.getSummary()
        );
    }
}