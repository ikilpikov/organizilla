package ru.organizilla.workspace.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.organizilla.workspace.domain.Card;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {
}
