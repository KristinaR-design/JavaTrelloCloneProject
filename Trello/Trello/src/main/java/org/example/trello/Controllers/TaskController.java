package org.example.trello.Controllers;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Columns;
import org.example.trello.Entity.Task;
import org.example.trello.Repositories.ColumnRepository;
import org.example.trello.Services.ColumnService;
import org.example.trello.Services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping()
    public List<Task> getTaskByColumn(){
        return taskService.getTasks();
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        try{
            taskService.addTask(task);

            return ResponseEntity.ok(task);}
        catch (Exception e){
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long taskId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        try{
            Task task = taskService.getTask(taskId);
            taskService.deleteTask(taskId);
            return ResponseEntity.ok(task);}
        catch (Exception e){
            return ResponseEntity.status(400).build();
        }
    }


    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        try{
            Task oldTask = taskService.getTask(taskId);
            if (task.getTitle() != null){
                oldTask.setTitle(task.getTitle());
            }
            oldTask.setT_order(task.getT_order());
            if (task.getColumnId() != null){
                oldTask.setColumnId(task.getColumnId());
            }
            oldTask.setCompleted(task.isCompleted());
            taskService.addTask(oldTask);
            return ResponseEntity.ok(oldTask);
        }
        catch (Exception e){
            return ResponseEntity.status(401).build();
        }
    }
}