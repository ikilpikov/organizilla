package ru.organizilla.workspace.dto.importing.trello;

import lombok.Getter;
import lombok.Setter;
import ru.organizilla.workspace.domain.enums.Color;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ImportBoardDto {

    String id;
    String name;
    Boolean active;
    String background;
    Map<Color, String> labelNames;
    List<ImportCheckListDto> checklists;
    List<ImportListDto> lists;
}
