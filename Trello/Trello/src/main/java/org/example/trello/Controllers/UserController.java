package org.example.trello.Controllers;
import org.example.trello.Services.UsersService;
import org.example.trello.Entity.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UsersService usersService;

    // Эндпоинты для CRUD пользователей остаются без изменений

    @GetMapping("/{userId}/boards")
    public List<Board> getUserBoards(@PathVariable Long userId) {
        return usersService.getUserBoards(userId);
    }

    @PostMapping("/{userId}/boards/{boardId}")
    public void addBoardToUser(@PathVariable Long userId, @PathVariable Long boardId) {
        usersService.addBoardToUser(userId, boardId);
    }

    @DeleteMapping("/{userId}/boards/{boardId}")
    public void removeBoardFromUser(@PathVariable Long userId, @PathVariable Long boardId) {
        usersService.removeBoardFromUser(userId, boardId);
    }
}