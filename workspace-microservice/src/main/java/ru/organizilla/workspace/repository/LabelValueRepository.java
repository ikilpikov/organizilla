package ru.organizilla.workspace.repository;

import org.springframework.data.repository.CrudRepository;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.LabelValue;

import java.util.List;

public interface LabelValueRepository extends CrudRepository<LabelValue, Long> {

    List<LabelValue> findByBoard(Board board);
}
