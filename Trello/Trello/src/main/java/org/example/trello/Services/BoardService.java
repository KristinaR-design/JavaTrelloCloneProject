package org.example.trello.Services;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.Board;
import org.example.trello.Entity.User;
import org.example.trello.Repositories.BoardRepository;
import org.example.trello.Repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public List<Board> getBoardsByUser(Long userId){
        return boardRepository.findByUserId(userId);
    }

    public void addBoard(Board board){
        boardRepository.save(board);
    }

    public void deleteBoard(Long boardId){boardRepository.deleteById(boardId);}

    public Board getBoard(Long boardId){return boardRepository.findById(boardId).get();}
}