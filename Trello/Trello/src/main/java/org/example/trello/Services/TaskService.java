package org.example.trello.Services;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Board;
import org.example.trello.Entity.Columns;
import org.example.trello.Entity.Task;
import org.example.trello.Repositories.BoardRepository;
import org.example.trello.Repositories.ColumnRepository;
import org.example.trello.Repositories.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final ColumnRepository columnRepository;
    private final BoardRepository boardRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByColumn(Columns column) {
        return taskRepository.findByColumns(column);
    }

    public Task createTask(Task task, Long columnId, Long boardId) {
        Columns column = columnRepository.findById(columnId).orElseThrow();
        Board board = boardRepository.findById(boardId).orElseThrow();
        task.setColumns(column);
        task.setBoard(board);
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setTitle(updatedTask.getTitle());
        task.setCompleted(updatedTask.isCompleted());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}