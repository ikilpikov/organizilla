package ru.organizilla.workspace.service;

import ru.organizilla.workspace.domain.enums.Color;
import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;
public interface CardService {

    CreatedCardInfoDto createCard(CreateCardDto listDto, String username);
    void deleteCard(Long cardId, String username);
    void setDescription(Long cardId, String username, String description);
    void renameCard(Long cardId, String username, String newName);
    void setColor(Long cardId, String username, Color color);
}
