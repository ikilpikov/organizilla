package ru.organizilla.workspace.dao;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.LabelValue;
import ru.organizilla.workspace.repository.LabelValueRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LabelValueDao {

    private final LabelValueRepository labelValueRepository;

    public LabelValue save(LabelValue label) {
        return labelValueRepository.save(label);
    }

    @Transactional
    public void delete(LabelValue label) {
        labelValueRepository.delete(label);
    }

    public List<LabelValue> getAllBoardColorValues(Board board) {
        return labelValueRepository.findByBoard(board);
    }
}
