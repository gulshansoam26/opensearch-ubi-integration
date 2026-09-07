package com.example.ubi_backend.service;

import com.example.ubi_backend.dto.UBIEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    private final OpenSearchService openSearchService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public KafkaConsumerService(
            OpenSearchService openSearchService) {

        this.openSearchService = openSearchService;
    }

    @KafkaListener(topics = "ubi-events",groupId = "ubi-event-group")
    public void consumeEvent(String eventJson) throws Exception{
            System.out.println("Received from Kafka:");
            System.out.println(eventJson);

            UBIEvent ubiEvent =
                    objectMapper.readValue(eventJson, UBIEvent.class);

            openSearchService.saveEvent(ubiEvent);
    }
}