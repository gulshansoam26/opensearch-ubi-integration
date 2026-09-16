package com.example.ubi_backend.validation;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import com.networknt.schema.dialect.Dialects;
import com.networknt.schema.Error;
import com.networknt.schema.Schema;
import com.networknt.schema.SchemaRegistry;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class UBISchemaValidator {

    private final Schema schema;
    private final ObjectMapper objectMapper;

    public UBISchemaValidator() throws IOException {

        ClassPathResource resource =
                new ClassPathResource("ubi/event.schema.json");

        SchemaRegistry schemaRegistry =
                SchemaRegistry.withDialect(Dialects.getDraft202012());

        String schemaData = new String(
                resource.getInputStream().readAllBytes(),
                StandardCharsets.UTF_8
        );

        this.schema = schemaRegistry.getSchema(schemaData);

        this.objectMapper = new ObjectMapper();
    }

    public List<Error> validate(String json)
            throws IOException {

        JsonNode jsonNode =
                objectMapper.readTree(json);

        return schema.validate(jsonNode);
    }
}