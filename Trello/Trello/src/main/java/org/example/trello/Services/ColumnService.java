package org.example.trello.Services;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Board;
import org.example.trello.Entity.Columns;
import org.example.trello.Repositories.BoardRepository;
import org.example.trello.Repositories.ColumnRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColumnService {
    private final ColumnRepository columnRepository;
    private final BoardRepository boardRepository;

    public List<Columns> getAllColumns() {
        return columnRepository.findAll();
    }

    public List<Columns> getColumnsByBoardId(Long boardId) {
        return columnRepository.findByBoardId(boardId);
    }

    public Columns createColumn(Columns column, Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        column.setBoard(board);
        return columnRepository.save(column);
    }

    public Columns updateColumn(Long id, Columns updatedColumn) {
        Columns column = columnRepository.findById(id).orElseThrow();
        column.setTitle(updatedColumn.getTitle());
        return columnRepository.save(column);
    }

    public void deleteColumn(Long id) {
        columnRepository.deleteById(id);
    }
}