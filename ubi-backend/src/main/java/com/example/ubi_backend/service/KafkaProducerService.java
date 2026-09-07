package com.example.ubi_backend.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaProducerService(
            KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEvent(String eventJson) {

        try {
            kafkaTemplate
                    .send("ubi-events", eventJson)
                    .get();

            System.out.println("Event sent to Kafka");

        } catch (Exception e) {

            System.out.println(
                    "Failed to send event to Kafka: "
                            + e.getMessage()
            );

            throw new RuntimeException(e);
        }
    }
}