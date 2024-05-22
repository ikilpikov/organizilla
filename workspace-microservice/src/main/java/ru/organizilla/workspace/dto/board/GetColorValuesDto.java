package ru.organizilla.workspace.dto.board;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.LinkedHashMap;
import java.util.Map;

public class GetColorValuesDto {

    private Map<String, String> colorValues = new LinkedHashMap<>();

    @JsonAnySetter
    public void addColorValue(String color, String value) {
        colorValues.put(color, value);
    }

    @JsonAnyGetter
    public Map<String, String> getColorValues() {
        return colorValues;
    }
}
