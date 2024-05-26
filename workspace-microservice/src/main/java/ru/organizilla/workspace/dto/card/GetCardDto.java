package ru.organizilla.workspace.dto.card;

import lombok.Builder;
import lombok.Getter;
import ru.organizilla.workspace.domain.enums.Color;

import java.sql.Timestamp;
import java.util.List;

@Builder
@Getter
public class GetCardDto {

    private Long id;
    private String name;
    private Boolean closed;
    private Timestamp lastActivity;
    private Timestamp deadline;
    private Boolean isTemplate;
    private Boolean isSubscribed;
    private List<Color> colors;
}
