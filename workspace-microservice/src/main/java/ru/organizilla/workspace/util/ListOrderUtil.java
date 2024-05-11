package ru.organizilla.workspace.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.repository.ListRepository;

@Component
@RequiredArgsConstructor
public class ListOrderUtil {

    private final ListRepository listRepository;

    private static final int INITIAL_POSITION = 65_536;
    private static final int MIN_POSITION = 2;
    private static final int MAX_POSITION = 1_073_741_824;

    public void changeListPosition(Long setAfter, ListEntity list) {

    }


}
