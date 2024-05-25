package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.organizilla.workspace.domain.Card;
import ru.organizilla.workspace.domain.ListEntity;

import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Query("select max(position) from Card where list = ?1")
    Optional<Integer> findMaximumPositionByList(ListEntity list);
}
