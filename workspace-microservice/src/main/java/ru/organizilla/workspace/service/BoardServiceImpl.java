package ru.organizilla.workspace.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.User;
import ru.organizilla.workspace.dto.CreateBoardDto;
import ru.organizilla.workspace.dto.GetAllBoardsDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.repository.BoardRepository;
import ru.organizilla.workspace.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public Long createBoard(CreateBoardDto boardDto, String username) {
        var user = getUserByUsername(username);
        var board = new Board();
        board.setCreatedBy(user);
        board.setName(boardDto.getName());
        board.setPublic(boardDto.getIsPublic());
        board.setBackgroundImage(boardDto.getBackgroundImage());
        return boardRepository.save(board).getId();
    }

    public List<GetAllBoardsDto> getAllBoards(String username) {
        var user = getUserByUsername(username);

        return boardRepository.findByCreatedBy(user).stream().map(board -> {
            var boardDto = new GetAllBoardsDto();
            boardDto.setId(board.getId());
            boardDto.setName(board.getName());
            boardDto.setBackgroundImage(board.getBackgroundImage());
            boardDto.setLastActivity(board.getLastActivity());
            return boardDto;
        }).toList();
    }

    @Override
    public void deleteBoard(Long boardId, String username) {
        var user = getUserByUsername(username);
        var board = getBoardById(boardId);

        if (!board.getCreatedBy().equals(user)) {
            throw new NotAllowedException("Deletion not allowed");
        }

        boardRepository.delete(board);
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
    }

    private Board getBoardById(Long id) {
        return boardRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Board not found: " + id));
    }
}
