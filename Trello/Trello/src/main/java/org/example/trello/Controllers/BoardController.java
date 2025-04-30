package org.example.trello.Controllers;
import lombok.RequiredArgsConstructor;
import org.example.trello.Entity.User;
import org.example.trello.Services.BoardService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/{boardId}/users")
    public List<User> getBoardUsers(@PathVariable Long boardId) {
        return boardService.getBoardUsers(boardId);
    }

    @PostMapping("/{boardId}/users/{userId}")
    public void addUserToBoard(@PathVariable Long boardId, @PathVariable Long userId) {
        boardService.addUserToBoard(boardId, userId);
    }

    @DeleteMapping("/{boardId}/users/{userId}")
    public void removeUserFromBoard(@PathVariable Long boardId, @PathVariable Long userId) {
        boardService.removeUserFromBoard(boardId, userId);
    }
}