package ru.organizilla.workspace.service.impl;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.dao.*;
import ru.organizilla.workspace.domain.LabelValue;
import ru.organizilla.workspace.domain.enums.Color;
import ru.organizilla.workspace.dto.board.*;
import ru.organizilla.workspace.mapper.BoardMapper;
import ru.organizilla.workspace.util.AccessCheckUtil;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.exception.NotAllowedException;
import ru.organizilla.workspace.service.BoardService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardDao boardDao;
    private final UserDao userDao;
    private final LabelValueDao labelValueDao;
    private final LabelColorDao labelColorDao;

    private final AccessCheckUtil accessCheckUtil;

    private final BoardMapper boardMapper;

    @Override
    public CreatedBoardInfoDto createBoard(CreateBoardDto boardDto, String username) {
        var user = userDao.getUserByUsername(username);
        var board = new Board();
        board.setCreatedBy(user);
        board.setName(boardDto.getName());
        board.setPublic(boardDto.getIsPublic());
        board.setBackgroundImage(boardDto.getBackgroundImage());
        return new CreatedBoardInfoDto(boardDao.save(board).getId());
    }

    @Override
    public List<GetAllBoardsDto> getAllBoards(String username) {
        var user = userDao.getUserByUsername(username);

        return boardDao.findByCreatedBy(user).stream().map(board -> {
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
        var user = userDao.getUserByUsername(username);
        var board = boardDao.getBoardById(boardId);

        if (!accessCheckUtil.canReadBoardEntities(user, board)) {
            throw new NotAllowedException("Cannot read board");
        }

        return boardMapper.boardToGetBoardDto(board);
    }

    @Override
    public void deleteBoard(Long boardId, String username) {
        var user = userDao.getUserByUsername(username);
        var board = boardDao.getBoardById(boardId);

        if (!accessCheckUtil.canCreateUpdateDeleteBoard(user, board)) {
            throw new NotAllowedException("Deletion not allowed");
        }

        boardDao.delete(board);
    }

    @Override
    public void setColorValue(Long boardId, String username, Color color, @Nullable String value) {
        var user = userDao.getUserByUsername(username);
        var board = boardDao.getBoardById(boardId);

        if (!accessCheckUtil.canCreateUpdateDeleteBoard(user, board)) {
            throw new NotAllowedException("Color setting not allowed");
        }

        if (value != null) {
            addColorValue(board, color, value);
        } else {
            removeColorValue(board, color);
        }
    }

    @Override
    public GetColorValuesDto getColorValues(Long boardId, String username) {
        var user = userDao.getUserByUsername(username);
        var board = boardDao.getBoardById(boardId);

        if (!accessCheckUtil.canCreateUpdateDeleteBoard(user, board)) {
            throw new NotAllowedException("Getting color not allowed");
        }

        var myColors = labelValueDao.getAllBoardColorValues(board);

        GetColorValuesDto getColorValuesDto = new GetColorValuesDto();
        myColors
                .forEach(x -> getColorValuesDto.addColorValue(x.getLabelColor().getColor().getColorValue(), x.getValue()));
        labelColorDao
                .getLabelColors()
                .forEach(x -> {
                    if (myColors.stream().noneMatch(y -> y.getLabelColor().equals(x))) {
                        getColorValuesDto.addColorValue(x.getColor().getColorValue(), null);
                    }
                });
        return getColorValuesDto;
    }

    private void addColorValue(Board board, Color color, String value) {
        var colorEntity = labelColorDao.getLabelColorByColor(color);
        var labelValue = board.getLabels()
                .stream()
                .filter(x -> x.getLabelColor().equals(colorEntity))
                .findFirst()
                .orElse(new LabelValue());

        labelValue.setBoard(board);
        labelValue.setLabelColor(colorEntity);
        labelValue.setValue(value);
        labelValueDao.save(labelValue);
    }

    private void removeColorValue(Board board, Color color) {
        var colorEntity = labelColorDao.getLabelColorByColor(color);
        var labelValue = board.getLabels()
                .stream()
                .filter(x -> x.getLabelColor().equals(colorEntity))
                .findFirst();

        labelValue.ifPresent(labelValueDao::delete);
    }
}
