package ru.organizilla.workspace.mapper;

import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.Card;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.dto.board.GetBoardDto;
import ru.organizilla.workspace.dto.card.GetCardDto;
import ru.organizilla.workspace.dto.list.GetListDto;

import java.util.Comparator;

@Component
public class BoardMapper {

    public GetBoardDto boardToGetBoardDto(Board board) {
        var listDtos = board.getLists()
                .stream()
                .sorted(Comparator.comparingInt(ListEntity::getPosition))
                .map(list -> GetListDto.builder()
                        .id(list.getId())
                        .name(list.getName())
                        .closed(list.isClosed())
                        .color(list.getColor())
                        .subscribed(list.getSubscribed())
                        .cards(list.getCards().stream().sorted(Comparator.comparingInt(Card::getPosition))
                                .map(card -> GetCardDto.builder()
                                        .id(card.getId())
                                        .name(card.getName())
                                        .closed(card.isClosed())
                                        .lastActivity(card.getLastActivity())
                                        .deadline(card.getDeadline())
                                        .isTemplate(card.isTemplate())
                                        .colors(card.getLabels().stream()
                                                .map(label -> label.getLabelValue()
                                                        .getLabelColor()
                                                        .getColor()).toList()).build())
                                .toList()).build()).toList();
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
