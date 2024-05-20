package ru.organizilla.workspace.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;
import ru.organizilla.workspace.service.CardService;

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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteList(@PathVariable("id") Long id,
                                             @RequestHeader(USERNAME_HEADER) String username) {
        cardService.deleteCard(id, username);
        return ok().body("Card deleted");
    }
}
