package ru.organizilla.workspace.service;

import ru.organizilla.workspace.dto.CreateBoardDto;

public interface BoardService {
    void createBoard(CreateBoardDto boardDto, String username);
}
