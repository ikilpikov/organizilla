package ru.organizilla.workspace.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.Card;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;
import ru.organizilla.workspace.dto.list.CreatedListInfoDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.repository.CardRepository;
import ru.organizilla.workspace.repository.ListRepository;
import ru.organizilla.workspace.service.CardService;
import ru.organizilla.workspace.service.UserService;
import ru.organizilla.workspace.util.AccessCheckUtil;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final ListRepository listRepository;

    private final UserService userService;

    private final AccessCheckUtil accessCheckUtil;

    @Override
    public CreatedCardInfoDto createCard(CreateCardDto cardDto, String username) {
        var list = getListById(cardDto.getListId());
        var user = userService.getUserByUsername(username);

        if (!accessCheckUtil.canCreateUpdateDeleteCardAndList(user, list.getBoard())) {
            throw new NotAllowedException("Creation not allowed");
        }

        var card = new Card();
        card.setList(list);
        card.setName(cardDto.getName());
        card.setPosition(1);

        //updateBoardLastActivity(board);

        return new CreatedCardInfoDto(cardRepository.save(card).getId());
    }

    @Override
    public void deleteCard(Long cardId, String username) {

    }

    @Override
    public void renameCard(Long cardId, String username, String newName) {

    }


    private ListEntity getListById(Long id) {
        return listRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("List not found: " + id));
    }
}
