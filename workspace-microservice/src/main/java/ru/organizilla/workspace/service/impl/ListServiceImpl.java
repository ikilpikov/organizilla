package ru.organizilla.workspace.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.domain.User;
import ru.organizilla.workspace.dto.list.CreateListDto;
import ru.organizilla.workspace.dto.list.CreatedListInfoDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.repository.BoardRepository;
import ru.organizilla.workspace.repository.ListRepository;
import ru.organizilla.workspace.repository.UserRepository;
import ru.organizilla.workspace.service.ListService;

@Service
@RequiredArgsConstructor
public class ListServiceImpl implements ListService {

    private final ListRepository listRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    private static final int POSITION_DELTA = 65_536;

    @Override
    public CreatedListInfoDto createList(CreateListDto listDto, String username) {
        var board = getBoardById(listDto.getBoardId());
        var user = getUserByUsername(username);

        if (!board.getCreatedBy().equals(user)) {
            throw new NotAllowedException("Creation not allowed");
        }

        var list = new ListEntity();
        list.setBoard(board);
        list.setName(listDto.getName());
        var previousBoardPosition = listRepository.findMaximumPositionByBoard(board).orElse(0);
        list.setPosition(previousBoardPosition + POSITION_DELTA);

        return new CreatedListInfoDto(listRepository.save(list).getId());
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
    }

    private Board getBoardById(Long id) {
        return boardRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Board not found: " + id));
    }
}
