package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.LabelValue;
import ru.organizilla.workspace.domain.enums.Color;

import java.util.List;
import java.util.Optional;

public interface LabelValueRepository extends JpaRepository<LabelValue, Long> {

    List<LabelValue> findByBoard(Board board);
    @Query("select lv from LabelValue lv where lv.board = ?1 and lv.labelColor.color = ?2")
    Optional<LabelValue> findByValueByBoardAndColor(Board board, Color color);
}
