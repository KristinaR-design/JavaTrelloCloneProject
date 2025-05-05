package org.example.columnservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "board-service")
public interface BoardServiceClient {
    @GetMapping("/api/boards/{boardId}")
    BoardDTO getBoardById(@PathVariable("id") Long boardId);
} 