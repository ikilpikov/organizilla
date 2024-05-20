package ru.organizilla.workspace.service;

import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;

public interface CardService {

    CreatedCardInfoDto createCard(CreateCardDto listDto, String username);
    void deleteCard(Long cardId, String username);
    void renameCard(Long cardId, String username, String newName);
}
