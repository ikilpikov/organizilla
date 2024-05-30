package ru.organizilla.workspace.dto.importing.trello;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class ImportCardDto {

    private Boolean closed;
    private String name;
    private Timestamp dateLastActivity;
    private Boolean isTemplate;
    private Boolean subscribed;
    private List<ImportLabelDto> labels;
}
