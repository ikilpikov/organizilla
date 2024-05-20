package ru.organizilla.workspace.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.workspace.dto.list.CreateListDto;
import ru.organizilla.workspace.dto.list.CreatedListInfoDto;
import ru.organizilla.workspace.dto.list.RenameListDto;
import ru.organizilla.workspace.dto.list.ReorderListDto;
import ru.organizilla.workspace.service.ListService;
import ru.organizilla.workspace.util.ListOrderUtil;

import static org.springframework.http.ResponseEntity.ok;
import static ru.organizilla.workspace.constant.RequestHeaderConstants.USERNAME_HEADER;

@RestController
@RequestMapping("/v1/workspace/list")
@RequiredArgsConstructor
public class ListController {

    private final ListService listService;
    private final ListOrderUtil listOrderUtil;

    @PostMapping("/create")
    public ResponseEntity<CreatedListInfoDto> createList(@RequestBody @Valid CreateListDto listDto,
                                                          @RequestHeader(USERNAME_HEADER) String username) {
        var listInfo = listService.createList(listDto, username);
        return ok().body(listInfo);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteList(@PathVariable("id") Long id,
                                              @RequestHeader(USERNAME_HEADER) String username) {
        listService.deleteList(id, username);
        return ok().body("List deleted");
    }

    @PatchMapping("/reorder/{id}")
    public ResponseEntity<String> reorderList(@PathVariable("id") Long id,
                                              @RequestHeader(USERNAME_HEADER) String username,
                                              @RequestBody ReorderListDto listDto) {
        listOrderUtil.changeListPosition(listDto.getPreviousListId(), listDto.getNextListId(), id);
        return ok().body("List reordered");
    }

    @PatchMapping("/rename/{id}")
    public ResponseEntity<String> renameList(@PathVariable("id") Long id,
                                             @RequestHeader(USERNAME_HEADER) String username,
                                             @RequestBody @Valid RenameListDto listDto) {
        listService.renameList(id, username, listDto.getName());
        return ok().body("List renamed");
    }
}
