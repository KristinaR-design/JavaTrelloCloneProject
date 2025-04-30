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

    public List<User> getBoardUsers(Long boardId) {
        return boardRepository.findUsersByBoardId(boardId);
    }

    public void addUserToBoard(Long boardId, Long userId) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        board.getUsers().add(user);
        boardRepository.save(board);
    }

    public void removeUserFromBoard(Long boardId, Long userId) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        board.getUsers().remove(user);
        boardRepository.save(board);
    }
}