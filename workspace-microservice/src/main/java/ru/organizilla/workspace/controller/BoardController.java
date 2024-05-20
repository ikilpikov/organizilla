package ru.organizilla.workspace.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.board.CreateBoardDto;
import ru.organizilla.workspace.dto.board.CreatedBoardInfoDto;
import ru.organizilla.workspace.dto.board.GetAllBoardsDto;
import ru.organizilla.workspace.dto.board.GetBoardDto;
import ru.organizilla.workspace.service.BoardService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;
import static ru.organizilla.workspace.constant.RequestHeaderConstants.USERNAME_HEADER;

@RestController
@RequestMapping("/v1/workspace/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/create")
    public ResponseEntity<CreatedBoardInfoDto> createBoard(@RequestBody @Valid CreateBoardDto boardDto,
                                                           @RequestHeader(USERNAME_HEADER) String username) {
        var boardInfo = boardService.createBoard(boardDto, username);
        return ok().body(boardInfo);
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetAllBoardsDto>> getAllBoards(@RequestHeader(USERNAME_HEADER) String username) {

        return ok().body(boardService.getAllBoards(username));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetBoardDto> getBoard(@PathVariable("id") Long id,
                                                @RequestHeader(USERNAME_HEADER) String username) {
        var board = boardService.getBoard(id, username);
        return ok().body(board);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBoard(@PathVariable("id") Long id,
                                              @RequestHeader(USERNAME_HEADER) String username) {
        boardService.deleteBoard(id, username);
        return ok().body("Board deleted");
    }
}
