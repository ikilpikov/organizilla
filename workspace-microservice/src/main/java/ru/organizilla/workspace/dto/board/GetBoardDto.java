package ru.organizilla.workspace.dto.board;

import lombok.Builder;
import lombok.Getter;
import ru.organizilla.workspace.dto.list.GetListDto;

import java.sql.Timestamp;
import java.util.List;

@Builder
@Getter
public class GetBoardDto {

    private String name;
    private Timestamp lastActivity;
    private Boolean isClosed;
    private String backgroundImage;
    private Boolean isPublic;
    private List<GetListDto> lists;
}
