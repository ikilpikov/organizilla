package ru.organizilla.workspace.service;

import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;
import ru.organizilla.workspace.dto.card.SetDescriptionDto;

public interface CardService {

    CreatedCardInfoDto createCard(CreateCardDto listDto, String username);
    void deleteCard(Long cardId, String username);
    void setDescription(Long cardId, String username, SetDescriptionDto descriptionDto);
    void renameCard(Long cardId, String username, String newName);
}
