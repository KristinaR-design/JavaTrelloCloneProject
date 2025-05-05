package org.example.columnservice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ColumnRepository extends JpaRepository<Columns, Long> {
    List<Columns> findByBoardId(Long boardId);
}