package ru.organizilla.workspace.dto.importing.trello;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ImportListDto {

    private String id;
    private String color;
    private Boolean closed;
    private String name;
    private Boolean subscribed;
    private List<ImportCardDto> cards;
}
