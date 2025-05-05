package org.example.columnservice;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class TasksDTO {
    private Long id;
    private String title;
    private boolean completed;
    private Long columnId;
    private Long t_order;
    private Long board_id;
}
