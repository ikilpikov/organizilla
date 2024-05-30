package ru.organizilla.workspace.service;

import ru.organizilla.workspace.domain.enums.Color;
import ru.organizilla.workspace.dto.board.*;
import ru.organizilla.workspace.dto.importing.trello.ImportBoardDto;

import java.util.List;

public interface BoardService {

    CreatedBoardInfoDto createBoard(CreateBoardDto boardDto, String username);
    List<GetAllBoardsDto> getAllBoards(String username);
    GetBoardDto getBoard(Long boardId, String username);
    void deleteBoard(Long boardId, String username);

    void setColorValue(Long boardId, String username, Color color, String value);
    GetColorValuesDto getColorValues(Long boardId, String username);
    Long importTrelloBoard(String username, ImportBoardDto importBoardDto);
}
