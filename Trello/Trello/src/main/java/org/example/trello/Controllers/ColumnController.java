package org.example.trello.Controllers;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Board;
import org.example.trello.Entity.Columns;
import org.example.trello.Services.ColumnService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/columns")
@RequiredArgsConstructor
public class ColumnController {
    private final ColumnService columnService;

    @GetMapping("/{boardId}")
    public List<Columns> getColumnByBoard(@PathVariable Long boardId){
        return columnService.getColumnsByBoard(boardId);
    }

    @PostMapping
    public ResponseEntity<Columns> addColumn(@RequestBody Columns column){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        try{
            columnService.addColumn(column);

            return ResponseEntity.ok(column);}
        catch (Exception e){
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/{columnId}")
    public ResponseEntity<Columns> deleteColumn(@PathVariable Long columnId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

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
