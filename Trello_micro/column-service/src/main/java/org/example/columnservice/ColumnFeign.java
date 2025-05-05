package org.example.columnservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "task-service")
public interface ColumnFeign {
    @GetMapping("/api/tasks/completed/{columnId}")
    List<TasksDTO> getCompletedTaskByColumn(@PathVariable Long columnId);
}