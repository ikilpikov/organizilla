package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.ListEntity;

import java.util.Optional;

@Repository
public interface ListRepository extends JpaRepository<ListEntity, Long> {

    @Query("select max(position) from ListEntity where board = ?1")
    Optional<Integer> findMaximumPositionByBoard(Board board);
}
