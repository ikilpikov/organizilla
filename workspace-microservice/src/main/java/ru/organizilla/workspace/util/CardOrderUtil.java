package ru.organizilla.workspace.util;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.Card;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.exception.CannotChangePositionException;
import ru.organizilla.workspace.repository.CardRepository;
import ru.organizilla.workspace.repository.ListRepository;

import java.util.Comparator;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CardOrderUtil {

    private final ListRepository listRepository;
    private final CardRepository cardRepository;

    private static final int POSITION_DELTA = 65_536;
    private static final int MIN_POSITION = 2;
    private static final int MAX_POSITION = 1_073_741_824;

    public void changeCardPosition(Long previousCardId, Long nextCardId, Long currentCardId, Long listId) {
        var card = getCardById(currentCardId);

        if (listId == null) {
            throw new CannotChangePositionException("List id cannot be null");
        }

        if (Objects.equals(previousCardId, nextCardId) && previousCardId != null) {
            throw new CannotChangePositionException("Previous and next card ids must not be same");
        }

        int calculatedPosition;

        if (previousCardId == null && nextCardId == null) {
            calculatedPosition = MIN_POSITION;
        } else if (nextCardId == null) {
            calculatedPosition = getCardById(previousCardId).getPosition() + POSITION_DELTA;
            if (calculatedPosition > MAX_POSITION) {
                recalculatePositions(card.getList());
            }
        } else if (previousCardId == null) {
            calculatedPosition = getCardById(nextCardId).getPosition() / 2;
            if (calculatedPosition < MIN_POSITION) {
                recalculatePositions(card.getList());
            }
        } else {
            var previousPosition = getCardById(previousCardId).getPosition();
            var nextPosition = getCardById(nextCardId).getPosition();

            if (Objects.equals(previousPosition, nextPosition)) {
                recalculatePositions(card.getList());
            }

            calculatedPosition = (previousPosition + nextPosition) / 2;
        }

        card.setPosition(calculatedPosition);
        cardRepository.save(card);
    }

    private void recalculatePositions(ListEntity list) {
        var cards = list.getCards();
        cards.sort(Comparator.comparingInt(Card::getPosition));

        int newPosition = POSITION_DELTA;
        for (Card card : cards) {
            card.setPosition(newPosition);
            newPosition += POSITION_DELTA;
        }

        listRepository.save(list);
    }

    private Card getCardById(Long id) {
        return cardRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card not found: " + id));
    }
}
