package com.example.ubi_backend.controller;

import com.example.ubi_backend.dto.AskRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = "http://localhost:5173")
public class AskController {

    private final ChatClient chatClient;

    public AskController(
            ChatClient.Builder chatClientBuilder,
            ToolCallbackProvider mcpTools) {

        this.chatClient = chatClientBuilder
                .defaultTools(mcpTools)
                .build();
    }

    @PostMapping("/ask")
    public ResponseEntity<String> ask(@RequestBody AskRequest request) {

        String answer = chatClient.prompt()
                .user(request.getQuestion())
                .call()
                .content();

        return ResponseEntity.ok(answer);
    }
}