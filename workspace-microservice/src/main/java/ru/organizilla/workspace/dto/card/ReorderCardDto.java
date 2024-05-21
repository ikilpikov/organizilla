package ru.organizilla.workspace.dto.card;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReorderCardDto {

    private Long previousCardId;
    private Long nextCardId;
    private Long listId;
}
