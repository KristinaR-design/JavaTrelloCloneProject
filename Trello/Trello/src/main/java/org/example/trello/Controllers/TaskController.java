package org.example.trello.Controllers;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Columns;
import org.example.trello.Entity.Task;
import org.example.trello.Repositories.ColumnRepository;
import org.example.trello.Services.TaskService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final ColumnRepository columnRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/column/{columnId}")
    public List<Task> getTasksByColumnId(@PathVariable Long columnId) {
        Optional<Columns> column = columnRepository.findById(columnId);
        return taskService.getTasksByColumn(column.get());
    }

    @PostMapping("/column/{columnId}/board/{boardId}")
    public Task createTask(
            @PathVariable Long columnId,
            @PathVariable Long boardId,
            @RequestBody Task task
    ) {
        return taskService.createTask(task, columnId, boardId);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}