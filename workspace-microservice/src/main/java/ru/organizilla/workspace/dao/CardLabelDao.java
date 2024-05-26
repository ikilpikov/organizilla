package ru.organizilla.workspace.dao;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.CardLabel;
import ru.organizilla.workspace.repository.CardLabelRepository;

@Component
@RequiredArgsConstructor
public class CardLabelDao {

    private final CardLabelRepository cardLabelRepository;

    public CardLabel save(CardLabel cardLabel) {
        return cardLabelRepository.save(cardLabel);
    }

    public void delete(CardLabel cardLabel) {
        cardLabelRepository.delete(cardLabel);
    }
}
