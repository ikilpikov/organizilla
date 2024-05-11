package ru.organizilla.workspace.util;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.exception.CannotChangePositionException;
import ru.organizilla.workspace.repository.BoardRepository;
import ru.organizilla.workspace.repository.ListRepository;

import java.util.Comparator;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class ListOrderUtil {

    private final ListRepository listRepository;
    private final BoardRepository boardRepository;

    private static final int POSITION_DELTA = 65_536;
    private static final int MIN_POSITION = 2;
    private static final int MAX_POSITION = 1_073_741_824;

    public void changeListPosition(Long previousListId, Long nextListId, Long currentListId) {
        ListEntity list = getListById(currentListId);

        if (previousListId == null && nextListId == null) {
            throw new CannotChangePositionException("Both previous and next list ids cannot be null");
        }

        if (Objects.equals(previousListId, nextListId)) {
            throw new CannotChangePositionException("Previous and next list ids must not be same");
        }

        Integer calculatedPosition;

        if (nextListId == null) {
            calculatedPosition = getListById(previousListId).getPosition() + POSITION_DELTA;
            if (calculatedPosition > MAX_POSITION) {
                recalculatePositions(list.getBoard());
            }
        } else if (previousListId == null) {
            calculatedPosition = getListById(nextListId).getPosition() / 2;
            if (calculatedPosition < MIN_POSITION) {
                recalculatePositions(list.getBoard());
            }
        } else {
            var previousPosition = getListById(previousListId).getPosition();
            var nextPosition = getListById(nextListId).getPosition();

            if (Objects.equals(previousPosition, nextPosition)) {
                recalculatePositions(list.getBoard());
            }

            calculatedPosition = (previousPosition + nextPosition) / 2;
        }

        list.setPosition(calculatedPosition);
        listRepository.save(list);
    }

    private ListEntity getListById(Long id) {
        return listRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("List not found: " + id));
    }

    private void recalculatePositions(Board board) {
        var lists = board.getLists();
        lists.sort(Comparator.comparingInt(ListEntity::getPosition));

        int newPosition = POSITION_DELTA;
        for (ListEntity list : lists) {
            list.setPosition(newPosition);
            newPosition += POSITION_DELTA;
        }

        boardRepository.save(board);
    }

}
