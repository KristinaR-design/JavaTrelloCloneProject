package org.example.columnservice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;


@RestController
@RequestMapping("/api/columns")
@RequiredArgsConstructor
public class ColumnController {
    private final ColumnService columnService;
    private final ColumnFeign feign;

    @GetMapping("/completedTasks/{boardId}")
    public List<TasksDTO> getCompletedTasks(@PathVariable Long boardId){
        List<TasksDTO> tasks = new ArrayList<TasksDTO>();
        List<Columns> columns = columnService.getColumnsByBoard(boardId);
        for(int i = 0; i<columns.size(); i++){
            tasks.addAll(feign.getCompletedTaskByColumn(columns.get(i).getId()));
        }
        return tasks;
    }

    @GetMapping("/{boardId}")
    public List<Columns> getColumnByBoard(@PathVariable Long boardId){
        return columnService.getColumnsByBoard(boardId);
    }

    @PostMapping
    public ResponseEntity<Columns> addColumn(@RequestBody Columns column){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth == null || !auth.isAuthenticated()) {
//            return ResponseEntity.status(401).build();
//        }
        try{
            columnService.addColumn(column);

            return ResponseEntity.ok(column);}
        catch (Exception e){
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/{columnId}")
    public ResponseEntity<Columns> deleteColumn(@PathVariable Long columnId) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth == null || !auth.isAuthenticated()) {
//            return ResponseEntity.status(401).build();
//        }
        try{
            Columns column = columnService.getColumn(columnId);
            columnService.deleteColumn(columnId);
            return ResponseEntity.ok(column);}
        catch (Exception e){
            return ResponseEntity.status(400).build();
        }
    }


    @PutMapping("/{columnId}")
    public ResponseEntity<Columns> updateColumn(@PathVariable Long columnId, @RequestBody Columns column){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth == null || !auth.isAuthenticated()) {
//            return ResponseEntity.status(401).build();
//        }

        try{
            Columns oldColumn = columnService.getColumn(columnId);
            oldColumn.setTitle(column.getTitle());
            oldColumn.setC_order(column.getC_order());
            columnService.addColumn(oldColumn);
            return ResponseEntity.ok(oldColumn);
        }
        catch (Exception e){
            return ResponseEntity.status(401).build();
        }
    }
}

