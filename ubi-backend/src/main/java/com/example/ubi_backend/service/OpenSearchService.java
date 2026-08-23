package com.example.ubi_backend.service;

import com.example.ubi_backend.dto.UBIEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.restclient.autoconfigure.RestClientSsl;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class OpenSearchService {

    private final RestClient restClient;

    public OpenSearchService(
            RestClient.Builder builder,
            RestClientSsl ssl,
            @Value("${opensearch.url}") String url,
            @Value("${opensearch.username}") String username,
            @Value("${opensearch.password}") String password) {

        this.restClient = builder
                .baseUrl(url)
                .apply(ssl.fromBundle("opensearch"))
                .defaultHeaders(headers ->
                        headers.setBasicAuth(username, password))
                .build();
    }

    public void saveEvent(UBIEvent event) {

        try {
            restClient.post()
                    .uri("/ubi_events/_doc")
                    .body(event)
                    .retrieve()
                    .toBodilessEntity();

            System.out.println("Event saved to OpenSearch");

        } catch (Exception e) {
            System.out.println("Failed to save event to OpenSearch: "
                    + e.getMessage());
        }
    }

    public String getSummary() {

        String query = """
                {
                  "size": 0,
                  "aggs": {
                    "actions": {
                      "terms": {
                        "field": "action_name"
                      }
                    }
                  }
                }
                """;

        return restClient.post()
                .uri("/ubi_events/_search")
                .body(query)
                .header("Content-Type", "application/json")
                .retrieve()
                .body(String.class);
    }
}