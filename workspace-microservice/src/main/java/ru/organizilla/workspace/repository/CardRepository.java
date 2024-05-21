package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.organizilla.workspace.domain.Card;
import ru.organizilla.workspace.domain.ListEntity;

import java.util.Optional;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {

    @Query("select max(position) from Card where list = ?1")
    Optional<Integer> findMaximumPositionByList(ListEntity list);
}
