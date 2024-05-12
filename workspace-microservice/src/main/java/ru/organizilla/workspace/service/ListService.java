package ru.organizilla.workspace.service;

import ru.organizilla.workspace.dto.list.CreateListDto;
import ru.organizilla.workspace.dto.list.CreatedListInfoDto;
import ru.organizilla.workspace.dto.list.ReorderListDto;

public interface ListService {

    CreatedListInfoDto createList(CreateListDto listDto, String username);
    void deleteList(Long listId, String username);
    void reorderList(Long listId, ReorderListDto reorderListDto, String username);
}
