package ru.organizilla.workspace.dto.importing.trello;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ImportCheckListDto {

    private String name;
    private String idCard;
    private List<ImportCheckListItemDto> checkItems;
}
