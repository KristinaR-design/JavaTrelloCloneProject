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

    public List<Task> getTasksByColumn(Long columnId){return taskRepository.findByColumnId(columnId);}

    public void addTask(Task task){
        taskRepository.save(task);
    }

    public void deleteTask(Long taskId){taskRepository.deleteById(taskId);}

    public Task getTask(Long taskId){return taskRepository.findById(taskId).get();}

    public List<Task> getTasks(){return taskRepository.findAll();}
}