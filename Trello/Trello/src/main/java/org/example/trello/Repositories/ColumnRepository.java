package org.example.trello.Repositories;
import org.example.trello.Entity.Columns;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ColumnRepository extends JpaRepository<Columns, Long> {
    List<Columns> findByBoardId(Long boardId);

}