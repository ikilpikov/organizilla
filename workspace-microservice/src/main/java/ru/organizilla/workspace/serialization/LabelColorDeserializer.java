package ru.organizilla.workspace.serialization;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import ru.organizilla.workspace.domain.enums.Color;

import java.io.IOException;

public class LabelColorDeserializer extends JsonDeserializer<Color> {

    @Override
    public Color deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
        String color = jsonParser.getText();
        return Color.fromString(color);
    }
}