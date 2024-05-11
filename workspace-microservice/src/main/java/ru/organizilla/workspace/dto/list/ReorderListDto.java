package ru.organizilla.workspace.dto.list;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReorderListDto {

    private Long previousListId;
    private Long nextListId;
}
