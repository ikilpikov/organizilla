package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.organizilla.workspace.domain.CardLabel;

@Repository
public interface CardLabelRepository extends JpaRepository<CardLabel, Long> {
}
