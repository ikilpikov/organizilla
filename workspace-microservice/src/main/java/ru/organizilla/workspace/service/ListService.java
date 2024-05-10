package ru.organizilla.workspace.service;

import ru.organizilla.workspace.dto.list.CreateListDto;
import ru.organizilla.workspace.dto.list.CreatedListInfoDto;

public interface ListService {

    CreatedListInfoDto createList(CreateListDto listDto, String username);
}
