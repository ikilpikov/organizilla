package ru.organizilla.workspace.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.list.CreateListDto;
import ru.organizilla.workspace.dto.list.CreatedListInfoDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.service.ListService;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;
import static ru.organizilla.workspace.constant.RequestHeaderConstants.USERNAME_HEADER;

@RestController
@RequestMapping("/v1/workspace/list")
@RequiredArgsConstructor
public class ListController {

    private final ListService listService;

    @PostMapping("/create")
    public ResponseEntity<CreatedListInfoDto> createBoard(@RequestBody @Valid CreateListDto listDto,
                                                          @RequestHeader(USERNAME_HEADER) String username) {
        var listInfo = listService.createList(listDto, username);
        return ok().body(listInfo);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBoard(@PathVariable("id") Long id,
                                              @RequestHeader(USERNAME_HEADER) String username) {
        listService.deleteList(id, username);
        return ok().body("List deleted");
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
