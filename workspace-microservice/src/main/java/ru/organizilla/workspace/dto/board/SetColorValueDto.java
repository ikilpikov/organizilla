package ru.organizilla.workspace.dto.board;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
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
    private String value;
}
