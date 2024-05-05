package ru.organizilla.workspace.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.dto.CreateBoardDto;
import ru.organizilla.workspace.repository.BoardRepository;
import ru.organizilla.workspace.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public void createBoard(CreateBoardDto boardDto, String username) {
        System.out.println("123");
        var user = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException(username));

        var board = new Board();
        board.setCreatedBy(user);
        board.setName(boardDto.getName());
        board.setPublic(boardDto.isPublic());
        board.setBackgroundImage(boardDto.getBackgroundImage());
        boardRepository.save(board);
    }
}
