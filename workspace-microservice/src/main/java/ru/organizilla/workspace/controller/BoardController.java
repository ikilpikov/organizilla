package ru.organizilla.workspace.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.CreateBoardDto;
import ru.organizilla.workspace.dto.GetAllBoardsDto;
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
    public ResponseEntity<String> createBoard(@RequestBody @Valid CreateBoardDto boardDto, @RequestHeader(USERNAME_HEADER) String username) {
        boardService.createBoard(boardDto, username);
        return ok().body("Board created");
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetAllBoardsDto>> getAllBoards(@RequestHeader(USERNAME_HEADER) String username) {
        return ok().body(boardService.getAllBoards(username));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        return badRequest().body("Invalid data");
    }

}
