package ru.organizilla.workspace.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.board.SetColorValueDto;
import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;
import ru.organizilla.workspace.dto.card.ReorderCardDto;
import ru.organizilla.workspace.dto.card.SetDescriptionDto;
import ru.organizilla.workspace.service.CardService;
import ru.organizilla.workspace.util.CardOrderUtil;

import static org.springframework.http.ResponseEntity.ok;
import static ru.organizilla.workspace.constant.RequestHeaderConstants.USERNAME_HEADER;

@RestController
@RequestMapping("/v1/workspace/card")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;
    private final CardOrderUtil cardOrderUtil;

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

    @PatchMapping("/reorder/{id}")
    public ResponseEntity<String> reorderList(@PathVariable("id") Long id,
                                              @RequestHeader(USERNAME_HEADER) String username,
                                              @RequestBody ReorderCardDto cardDto) {
        cardOrderUtil.changeCardPosition(cardDto.getPreviousCardId(), cardDto.getNextCardId(), id, cardDto.getListId());
        return ok().body("Card reordered");
    }

    @PatchMapping("{id}/description")
    public ResponseEntity<String> setDescription(@PathVariable("id") Long id,
                                              @RequestHeader(USERNAME_HEADER) String username,
                                              @RequestBody @Valid SetDescriptionDto cardDto) {
        cardService.setDescription(id, username, cardDto.getDescription());
        return ok().body("Description set");
    }

    @PatchMapping("/{id}/color")
    public ResponseEntity<String> setColor(@PathVariable("id") Long id,
                                           @RequestHeader(USERNAME_HEADER) String username,
                                           @RequestBody @Valid SetColorValueDto colorValueDto) {
        cardService.setColor(id, username, colorValueDto.getColor());
        return ok().body("Color value set successfully");
    }

    @DeleteMapping("/{id}/color")
    public ResponseEntity<String> deleteColor(@PathVariable("id") Long id,
                                           @RequestHeader(USERNAME_HEADER) String username,
                                           @RequestBody @Valid SetColorValueDto colorValueDto) {
        cardService.removeColor(id, username, colorValueDto.getColor());
        return ok().body("Color value removed successfully");
    }
}
