package ru.organizilla.workspace.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.dto.board.GetBoardDto;
import ru.organizilla.workspace.dto.card.GetCardDto;
import ru.organizilla.workspace.dto.list.GetListDto;
import ru.organizilla.workspace.util.AccessCheckUtil;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.User;
import ru.organizilla.workspace.dto.board.CreateBoardDto;
import ru.organizilla.workspace.dto.board.CreatedBoardInfoDto;
import ru.organizilla.workspace.dto.board.GetAllBoardsDto;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.repository.BoardRepository;
import ru.organizilla.workspace.repository.UserRepository;
import ru.organizilla.workspace.service.BoardService;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    private final AccessCheckUtil accessCheckUtil;

    @Override
    public CreatedBoardInfoDto createBoard(CreateBoardDto boardDto, String username) {
        var user = getUserByUsername(username);
        var board = new Board();
        board.setCreatedBy(user);
        board.setName(boardDto.getName());
        board.setPublic(boardDto.getIsPublic());
        board.setBackgroundImage(boardDto.getBackgroundImage());
        return new CreatedBoardInfoDto(boardRepository.save(board).getId());
    }

    @Override
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
    public GetBoardDto getBoard(Long boardId, String username) {
        var user = getUserByUsername(username);
        var board = getBoardById(boardId);

        if (!accessCheckUtil.canReadBoardEntities(user, board)) {
            throw new NotAllowedException("Cannot read board");
        }

        return buildGetBoardDto(board);
    }

    @Override
    public void deleteBoard(Long boardId, String username) {
        var user = getUserByUsername(username);
        var board = getBoardById(boardId);

        if (!accessCheckUtil.canCreateUpdateDeleteBoard(user, board)) {
            throw new NotAllowedException("Deletion not allowed");
        }

        boardRepository.delete(board);
    }

    private User getUserByUsername(String username) {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
    }

    private Board getBoardById(Long id) {
        return boardRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found: " + id));
    }

    private GetBoardDto buildGetBoardDto(Board board) {
        var listDtos = board.getLists()
                .stream()
                .sorted(Comparator.comparingInt(ListEntity::getPosition))
                .map(list -> GetListDto.builder()
                        .name(list.getName())
                        .closed(list.isClosed())
                        .color(list.getColor())
                        .subscribed(list.getSubscribed())
                        .cards(list.getCards().stream().map(card -> GetCardDto.builder()
                                .name(card.getName())
                                .closed(card.isClosed())
                                .lastActivity(card.getLastActivity())
                                .deadline(card.getDeadline())
                                .isTemplate(card.isTemplate())
                                .isSubscribed(card.isSubscribed()).build()).toList()).build()).toList();
        return GetBoardDto.builder()
                .name(board.getName())
                .lastActivity(board.getLastActivity())
                .isClosed(board.isClosed())
                .backgroundImage(board.getBackgroundImage())
                .isPublic(board.isPublic())
                .lists(listDtos)
                .build();
    }
}
