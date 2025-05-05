package org.example.boardservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "column-service")
public interface BoardFeign {
    @GetMapping("/api/columns/completedTasks/{boardId}")
    List<TasksDTO> getCompletedTasks(@PathVariable Long boardId);
}