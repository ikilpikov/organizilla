package ru.organizilla.workspace.service;

import ru.organizilla.workspace.dto.CreateBoardDto;
import ru.organizilla.workspace.dto.GetAllBoardsDto;

import java.util.List;

public interface BoardService {
    void createBoard(CreateBoardDto boardDto, String username);

    List<GetAllBoardsDto> getAllBoards(String username);
}
