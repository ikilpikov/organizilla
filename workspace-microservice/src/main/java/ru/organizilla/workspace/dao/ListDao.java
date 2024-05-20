package ru.organizilla.workspace.dao;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.ListEntity;
import ru.organizilla.workspace.repository.ListRepository;

@Component
@RequiredArgsConstructor
public class ListDao {

    private final ListRepository listRepository;

    public ListEntity getListById(Long id) {
        return listRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("List not found: " + id));
    }

    public ListEntity save(ListEntity list) {
        return listRepository.save(list);
    }


    public void delete(ListEntity list) {
        listRepository.delete(list);
    }
}


