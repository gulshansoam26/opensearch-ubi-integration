package com.example.ubi_backend.validation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.ValidationMessage;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

@Component
public class UBISchemaValidator {

    private final JsonSchema schema;
    private final ObjectMapper objectMapper;

    public UBISchemaValidator() throws IOException {

        ClassPathResource resource =
                new ClassPathResource("ubi/event.schema.json");

        JsonSchemaFactory factory =
                JsonSchemaFactory.getInstance(
                        SpecVersion.VersionFlag.V202012
                );

        this.schema = factory.getSchema(
                resource.getInputStream()
        );

        this.objectMapper = new ObjectMapper();
    }

    public Set<ValidationMessage> validate(String json)
            throws IOException {

        JsonNode jsonNode =
                objectMapper.readTree(json);

        return schema.validate(jsonNode);
    }
}