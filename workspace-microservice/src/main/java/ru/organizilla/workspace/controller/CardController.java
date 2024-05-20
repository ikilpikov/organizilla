package ru.organizilla.workspace.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;
import ru.organizilla.workspace.dto.list.CreateListDto;
import ru.organizilla.workspace.dto.list.CreatedListInfoDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.service.CardService;
import ru.organizilla.workspace.service.impl.CardServiceImpl;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;
import static ru.organizilla.workspace.constant.RequestHeaderConstants.USERNAME_HEADER;

@RestController
@RequestMapping("/v1/workspace/card")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @PostMapping("/create")
    public ResponseEntity<CreatedCardInfoDto> createCard(@RequestBody @Valid CreateCardDto cardDto,
                                                         @RequestHeader(USERNAME_HEADER) String username) {
        var cardInfo = cardService.createCard(cardDto, username);
        return ok().body(cardInfo);
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
