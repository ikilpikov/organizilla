package ru.organizilla.workspace.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.dao.*;
import ru.organizilla.workspace.domain.Card;
import ru.organizilla.workspace.domain.CardLabel;
import ru.organizilla.workspace.domain.enums.Color;
import ru.organizilla.workspace.dto.card.CreateCardDto;
import ru.organizilla.workspace.dto.card.CreatedCardInfoDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.service.CardService;
import ru.organizilla.workspace.util.AccessCheckUtil;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final UserDao userDao;

    private final ListDao listDao;
    private final CardDao cardDao;
    private final BoardDao boardDao;

    private final CardLabelDao cardLabelDao;
    private final LabelValueDao labelValueDao;

    private final AccessCheckUtil accessCheckUtil;

    private static final int POSITION_DELTA = 65_536;

    @Override
    public CreatedCardInfoDto createCard(CreateCardDto cardDto, String username) {
        var list = listDao.getListById(cardDto.getListId());
        var user = userDao.getUserByUsername(username);

        if (!accessCheckUtil.canCreateUpdateDeleteCardAndList(user, list.getBoard())) {
            throw new NotAllowedException("Creation not allowed");
        }

        var card = new Card();
        card.setList(list);
        card.setName(cardDto.getName());
        var previousCardPosition = cardDao.getMaxCardPositionInList(list).orElse(0);
        card.setPosition(previousCardPosition + POSITION_DELTA);

        boardDao.updateLastActivity(card.getList().getBoard());
        return new CreatedCardInfoDto(cardDao.save(card).getId());
    }

    @Override
    public void deleteCard(Long cardId, String username) {
        var user = userDao.getUserByUsername(username);
        var card = cardDao.getCardById(cardId);

        if (!accessCheckUtil.canCreateUpdateDeleteCardAndList(user, card.getList().getBoard())) {
            throw new NotAllowedException("Deletion not allowed");
        }

        boardDao.updateLastActivity(card.getList().getBoard());
        cardDao.delete(card);
    }

    @Override
    public void renameCard(Long cardId, String username, String newName) {
        var user = userDao.getUserByUsername(username);
        var card = cardDao.getCardById(cardId);

        if (!accessCheckUtil.canCreateUpdateDeleteCardAndList(user, card.getList().getBoard())) {
            throw new NotAllowedException("Renaming not allowed");
        }

        card.setName(newName);
        boardDao.updateLastActivity(card.getList().getBoard());
        cardDao.save(card);
    }

    @Override
    public void setDescription(Long cardId, String username, String description) {
        var user = userDao.getUserByUsername(username);
        var card = cardDao.getCardById(cardId);

        if (!accessCheckUtil.canCreateUpdateDeleteCardAndList(user, card.getList().getBoard())) {
            throw new NotAllowedException("Renaming not allowed");
        }

        card.setDescription(description);
        cardDao.save(card);
    }

    @Override
    public void setColor(Long cardId, String username, Color color) {
        var user = userDao.getUserByUsername(username);
        var card = cardDao.getCardById(cardId);

        if (!accessCheckUtil.canCreateUpdateDeleteCardAndList(user, card.getList().getBoard())) {
            throw new NotAllowedException("Setting color not allowed");
        }

        var labelValue = labelValueDao.getLabelValueByBoardAndColor(card.getList().getBoard(), color);

        if (labelValue.getCardLabels().stream().anyMatch(x -> x.getLabelValue().equals(labelValue))) {
            return;
        }

        var cardLabel = new CardLabel();
        cardLabel.setCard(card);
        cardLabel.setLabelValue(labelValue);
        cardLabelDao.save(cardLabel);
    }

    @Override
    public void removeColor(Long cardId, String username, Color color) {
        var user = userDao.getUserByUsername(username);
        var card = cardDao.getCardById(cardId);

        if (!accessCheckUtil.canCreateUpdateDeleteCardAndList(user, card.getList().getBoard())) {
            throw new NotAllowedException("Removing color not allowed");
        }

        var cardLabel = cardDao.getCardById(cardId).getLabels().stream().filter(label -> label.getLabelValue()
                .getLabelColor()
                .getColor()
                .equals(color)).findFirst();

        cardLabel.ifPresent(cardLabelDao::delete);
    }
}
