package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.LabelValue;

import java.util.List;

public interface LabelValueRepository extends JpaRepository<LabelValue, Long> {

    List<LabelValue> findByBoard(Board board);
}
