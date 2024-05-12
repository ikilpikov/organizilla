package ru.organizilla.workspace.dto.board;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class GetAllBoardsDto {

    private Long id;
    private String name;
    private String backgroundImage;
    private Timestamp lastActivity;
}
