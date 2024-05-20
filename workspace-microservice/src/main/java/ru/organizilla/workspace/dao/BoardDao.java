package ru.organizilla.workspace.dao;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.User;
import ru.organizilla.workspace.repository.BoardRepository;

import java.sql.Timestamp;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BoardDao {

    private final BoardRepository boardRepository;

    public List<Board> findByCreatedBy(User user) {
        return boardRepository.findByCreatedBy(user);
    }

    public Board getBoardById(Long id) {
        return boardRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found: " + id));
    }

    public Board save(Board board) {
        return boardRepository.save(board);
    }


    public void delete(Board board) {
        boardRepository.delete(board);
    }

    public void updateLastActivity(Board board) {
        board.setLastActivity(new Timestamp(System.currentTimeMillis()));
        boardRepository.save(board);
    }
}
