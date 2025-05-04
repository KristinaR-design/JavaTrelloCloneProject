package org.example.trello.Services;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Board;
import org.example.trello.Entity.Columns;
import org.example.trello.Repositories.BoardRepository;
import org.example.trello.Repositories.ColumnRepository;
import org.example.trello.Repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColumnService {
    private final ColumnRepository columnRepository;

    public List<Columns> getColumnsByBoard(Long boardId){return columnRepository.findByBoardId(boardId);
    }

    public void addColumn(Columns columns){
        columnRepository.save(columns);
    }

    public void deleteColumn(Long columnId){columnRepository.deleteById(columnId);}

    public Columns getColumn(Long columnId){return columnRepository.findById(columnId).get();}
}