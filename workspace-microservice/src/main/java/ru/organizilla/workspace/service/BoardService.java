package ru.organizilla.workspace.service;

import ru.organizilla.workspace.dto.board.CreateBoardDto;
import ru.organizilla.workspace.dto.board.CreatedBoardInfoDto;
import ru.organizilla.workspace.dto.board.GetAllBoardsDto;
import ru.organizilla.workspace.dto.board.GetBoardDto;

import java.util.List;

public interface BoardService {

    CreatedBoardInfoDto createBoard(CreateBoardDto boardDto, String username);

    List<GetAllBoardsDto> getAllBoards(String username);
    GetBoardDto getBoard(Long boardId, String username);

    void deleteBoard(Long boardId, String username);
}
