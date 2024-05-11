package ru.organizilla.workspace.dto.list;

import lombok.Builder;
import lombok.Getter;
import ru.organizilla.workspace.dto.card.GetCardDto;

import java.util.List;

@Builder
@Getter
public class GetListDto {

    private Long id;
    private String name;
    private Boolean closed;
    private String color;
    private Boolean subscribed;
    private List<GetCardDto> cards;
}
