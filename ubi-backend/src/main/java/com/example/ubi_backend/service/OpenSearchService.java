package com.example.ubi_backend.service;

import com.example.ubi_backend.dto.CategoryFilterCount;
import com.example.ubi_backend.dto.KeywordCount;
import com.example.ubi_backend.dto.ProductClickCount;
import com.example.ubi_backend.dto.UBIEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.restclient.autoconfigure.RestClientSsl;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            restClient.post()
                    .uri("/ubi_events/_doc")
                    .body(event)
                    .retrieve()
                    .toBodilessEntity();

            System.out.println("Event saved to OpenSearch");
    }

    public Map<String, Long> getSummary() {

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

        String responseJson = restClient.post()
                .uri("/ubi_events/_search")
                .body(query)
                .header("Content-Type", "application/json")
                .retrieve()
                .body(String.class);

        Map<String, Long> counts = new HashMap<>();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            JsonNode buckets = root.path("aggregations").path("actions").path("buckets");

            for (JsonNode bucket : buckets) {
                String action = bucket.path("key").asText();
                long count = bucket.path("doc_count").asLong();
                counts.put(action, count);
            }
        } catch (Exception e) {
            System.out.println("Failed to parse summary: " + e.getMessage());
        }

        return counts;
    }

    public List<KeywordCount> getTopQueries(int size) {

        String query = """
            {
              "size": 0,
              "aggs": {
                "top_queries": {
                  "terms": { "field": "user_query", "size": %d}
                }
              }
            }
            """.formatted(size);

        String responseJson = restClient.post()
                .uri("/ubi_events/_search")
                .body(query)
                .header("Content-Type", "application/json")
                .retrieve()
                .body(String.class);

        List<KeywordCount> results = new ArrayList<>();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            JsonNode buckets = root.path("aggregations").path("top_queries").path("buckets");

            for (JsonNode bucket : buckets) {
                String keyword = bucket.path("key").asText();
                long count = bucket.path("doc_count").asLong();
                results.add(new KeywordCount(keyword, count));
            }
        } catch (Exception e) {
            System.out.println("Failed to parse top queries: " + e.getMessage());
        }

        return results;
    }

    public List<ProductClickCount> getTopClickedProducts(int size) {

        String query = """
            {
              "size": 0,
              "query": {
                "term": { "action_name": "click" }
              },
              "aggs": {
                "top_products": {
                  "terms": { "field": "event_attributes.product_name.keyword", "size": %d }
                }
              }
            }
            """.formatted(size);

        String responseJson = restClient.post()
                .uri("/ubi_events/_search")
                .body(query)
                .header("Content-Type", "application/json")
                .retrieve()
                .body(String.class);

        List<ProductClickCount> results = new ArrayList<>();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            JsonNode buckets = root.path("aggregations").path("top_products").path("buckets");

            for (JsonNode bucket : buckets) {
                String name = bucket.path("key").asText();
                long count = bucket.path("doc_count").asLong();
                results.add(new ProductClickCount(name, count));
            }
        } catch (Exception e) {
            System.out.println("Failed to parse top clicked products: " + e.getMessage());
        }

        return results;
    }

    public List<CategoryFilterCount> getTopFilteredCategories(int size) {

        String query = """
            {
              "size": 0,
              "query": {
                "term": { "action_name": "filter" }
              },
              "aggs": {
                "top_categories": {
                  "terms": { "field": "event_attributes.category.keyword", "size": %d }
                }
              }
            }
            """.formatted(size);

        String responseJson = restClient.post()
                .uri("/ubi_events/_search")
                .body(query)
                .header("Content-Type", "application/json")
                .retrieve()
                .body(String.class);

        List<CategoryFilterCount> results = new ArrayList<>();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            JsonNode buckets = root.path("aggregations").path("top_categories").path("buckets");

            for (JsonNode bucket : buckets) {
                String category = bucket.path("key").asText();
                long count = bucket.path("doc_count").asLong();
                results.add(new CategoryFilterCount(category, count));
            }
        } catch (Exception e) {
            System.out.println("Failed to parse top filtered categories: " + e.getMessage());
        }

        return results;
    }

    public Map<Integer, Long> getClickCountsByProductId() {

        String query = """
            {
              "size": 0,
              "query": {
                "term": { "action_name": "click" }
              },
              "aggs": {
                "by_product": {
                  "terms": { "field": "event_attributes.object.object_id", "size": 1000 }
                }
              }
            }
            """;

        String responseJson = restClient.post()
                .uri("/ubi_events/_search")
                .body(query)
                .header("Content-Type", "application/json")
                .retrieve()
                .body(String.class);

        Map<Integer, Long> clickCounts = new HashMap<>();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            JsonNode buckets = root.path("aggregations").path("by_product").path("buckets");

            for (JsonNode bucket : buckets) {
                int productId = bucket.path("key").asInt();
                long count = bucket.path("doc_count").asLong();
                clickCounts.put(productId, count);
            }
        } catch (Exception e) {
            System.out.println("Failed to parse click counts by product id: " + e.getMessage());
        }

        return clickCounts;
    }
}