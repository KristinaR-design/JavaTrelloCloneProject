package org.example.trello.Controllers;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Columns;
import org.example.trello.Services.ColumnService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/columns")
@RequiredArgsConstructor
public class ColumnController {
    private final ColumnService columnService;

    @GetMapping
    public List<Columns> getAllColumns() {
        return columnService.getAllColumns();
    }

    @GetMapping("/board/{boardId}")
    public List<Columns> getColumnsByBoardId(@PathVariable Long boardId) {
        return columnService.getColumnsByBoardId(boardId);
    }

    @PostMapping("/board/{boardId}")
    public Columns createColumn(@PathVariable Long boardId, @RequestBody Columns column) {
        return columnService.createColumn(column, boardId);
    }

    @PutMapping("/{id}")
    public Columns updateColumn(@PathVariable Long id, @RequestBody Columns column) {
        return columnService.updateColumn(id, column);
    }

    @DeleteMapping("/{id}")
    public void deleteColumn(@PathVariable Long id) {
        columnService.deleteColumn(id);
    }
}
