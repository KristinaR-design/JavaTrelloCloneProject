package org.example.taskservice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByColumnId(Long columnId);

    List<Task> findByCompletedAndColumnId(Boolean isTrue, Long columnId);
}
