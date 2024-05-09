package ru.organizilla.workspace.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.CreateBoardDto;
import ru.organizilla.workspace.dto.GetAllBoardsDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.service.BoardService;

import java.util.List;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/workspace/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    private static final String USERNAME_HEADER = "X-Username";

    @PostMapping("/create")
    public ResponseEntity<String> createBoard(@RequestBody @Valid CreateBoardDto boardDto,
                                              @RequestHeader(USERNAME_HEADER) String username) {
        var boardId = boardService.createBoard(boardDto, username);
        return ok().body("boardId: " + boardId);
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetAllBoardsDto>> getAllBoards(@RequestHeader(USERNAME_HEADER) String username) {

        return ok().body(boardService.getAllBoards(username));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBoard(@PathVariable("id") Long id,
                                              @RequestHeader(USERNAME_HEADER) String username) {
        boardService.deleteBoard(id, username);
        return ok().body("Board deleted");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        return badRequest().body("Invalid data");
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        return badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(NotAllowedException.class)
    public ResponseEntity<String> handleNotAllowedException(NotAllowedException ex) {
        return badRequest().body(ex.getMessage());
    }
}
