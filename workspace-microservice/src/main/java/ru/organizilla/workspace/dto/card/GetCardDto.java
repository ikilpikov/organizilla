package ru.organizilla.workspace.dto.card;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Builder
@Getter
public class GetCardDto {

    private String name;
    private Boolean closed;
    private Timestamp lastActivity;
    private Timestamp deadline;
    private Boolean isTemplate;
    private Boolean isSubscribed;
}
