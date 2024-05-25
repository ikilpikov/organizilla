package ru.organizilla.workspace.dto.board;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import ru.organizilla.workspace.domain.enums.Color;
import ru.organizilla.workspace.serialization.LabelColorDeserializer;
import ru.organizilla.workspace.serialization.LabelColorSerializer;

@Getter
@Setter
public class SetColorValueDto {

    @JsonSerialize(using = LabelColorSerializer.class)
    @JsonDeserialize(using = LabelColorDeserializer.class)
    private Color color;
    @Size(min = 1, max = 100)
    private String value;
}
