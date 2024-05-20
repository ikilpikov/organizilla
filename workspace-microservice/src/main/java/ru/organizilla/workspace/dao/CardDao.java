package ru.organizilla.workspace.dao;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.Card;
import ru.organizilla.workspace.repository.CardRepository;

@Component
@RequiredArgsConstructor
public class CardDao {

    private final CardRepository cardRepository;

    public Card getCardById(Long id) {
        return cardRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Card not found: " + id));
    }

    public Card save(Card card) {
        return cardRepository.save(card);
    }


    public void delete(Card card) {
        cardRepository.delete(card);
    }
}


