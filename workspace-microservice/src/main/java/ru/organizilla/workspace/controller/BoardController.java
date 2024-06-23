package ru.organizilla.workspace.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.board.*;
import ru.organizilla.workspace.dto.importing.trello.ImportBoardDto;
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

    @PatchMapping("/{id}/color")
    public ResponseEntity<String> setColor(@PathVariable("id") Long id,
                                           @RequestHeader(USERNAME_HEADER) String username,
                                           @RequestBody @Valid SetColorValueDto colorValueDto) {
        boardService.setColorValue(id, username, colorValueDto.getColor(), colorValueDto.getValue());
        return ok().body("Color value set successfully");
    }

    @GetMapping("/{id}/color/all")
    public ResponseEntity<GetColorValuesDto> getAllColors(@PathVariable("id") Long id,
                                           @RequestHeader(USERNAME_HEADER) String username) {
        var colors = boardService.getColorValues(id, username);
        return ok().body(colors);
    }

    @PostMapping("/import")
    public ResponseEntity<String> importTrelloBoard(@RequestHeader(USERNAME_HEADER) String username,
                                                               @RequestBody List<ImportBoardDto> boardDtos) {
        for (var boardDto : boardDtos) {
            boardService.importTrelloBoard(username, boardDto);
        }
        return ok().body("ok");
    }
}
