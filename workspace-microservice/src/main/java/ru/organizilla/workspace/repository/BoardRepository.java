package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.organizilla.workspace.domain.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
