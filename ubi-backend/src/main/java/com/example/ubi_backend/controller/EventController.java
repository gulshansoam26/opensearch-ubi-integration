package com.example.ubi_backend.controller;

import com.example.ubi_backend.service.KafkaProducerService;
import com.example.ubi_backend.validation.UBISchemaValidator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.networknt.schema.Error;

import java.util.List;


@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final KafkaProducerService kafkaProducerService;
    private final UBISchemaValidator ubiSchemaValidator;


    public EventController(
            KafkaProducerService kafkaProducerService,
            UBISchemaValidator ubiSchemaValidator) {

        this.kafkaProducerService = kafkaProducerService;
        this.ubiSchemaValidator = ubiSchemaValidator;
    }

    @PostMapping
    public ResponseEntity<?> receiveEvent(
            @RequestBody String eventJson) {

        System.out.println("Received Event:");
        System.out.println(eventJson);

        try {

            List<Error> errors = ubiSchemaValidator.validate(eventJson);

            System.out.println("Validation errors: " + errors);

            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(errors);
            }

            kafkaProducerService.sendEvent(eventJson);

            return ResponseEntity.ok(
                    "Event received and stored"
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body("Invalid event: " + e.getMessage());
        }
    }

}