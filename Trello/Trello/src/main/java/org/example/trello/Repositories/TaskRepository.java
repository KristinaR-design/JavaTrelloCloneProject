package org.example.trello.Repositories;
import org.example.trello.Entity.Columns;
import org.example.trello.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByColumnId(Long columnId);
}