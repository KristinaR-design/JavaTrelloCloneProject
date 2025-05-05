package org.example.boardservice.Controllers;

import lombok.RequiredArgsConstructor;

//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.example.boardservice.BoardFeign;
import org.example.boardservice.Entity.Board;
import org.example.boardservice.Services.BoardService;

import org.example.boardservice.TasksDTO;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final BoardFeign feign;

    @GetMapping("/completedTasks/{userId}")
    public List<TasksDTO> getCompletedTasks(@PathVariable Long userId){
        List<TasksDTO> tasks = new ArrayList<TasksDTO>();
        List<Board> boards = boardService.getBoardsByUser(userId);
        for(int i = 0; i<boards.size(); i++){
            tasks.addAll(feign.getCompletedTasks(boards.get(i).getId()));
        }
        return tasks;
    }

    @GetMapping("/{userId}")
    public List<Board> getBoardsByUser(@PathVariable Long userId){
        return boardService.getBoardsByUser(userId);
    }


    @PostMapping
    public ResponseEntity<Board> addBoard(@RequestBody Board board){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth == null || !auth.isAuthenticated()) {
//            return ResponseEntity.status(401).build();
//        }
        try{
            boardService.addBoard(board);

            return ResponseEntity.ok(board);}
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(600).build();
        }
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Board> deleteBoard(@PathVariable Long boardId) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth == null || !auth.isAuthenticated()) {
//            return ResponseEntity.status(401).build();
//        }
        try{
            Board board = boardService.getBoard(boardId);
            boardService.deleteBoard(boardId);
            return ResponseEntity.ok(board);}
        catch (Exception e){
            return ResponseEntity.status(400).build();
        }
    }


    @PutMapping("/{boardId}")
    public ResponseEntity<Board> updateBoard(@PathVariable Long boardId, @RequestBody Board board){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth == null || !auth.isAuthenticated()) {
//            return ResponseEntity.status(401).build();
//        }

        try{
            Board oldBoard = boardService.getBoard(boardId);
            oldBoard.setColor(board.getColor());
            oldBoard.setTitle(board.getTitle());
            boardService.addBoard(oldBoard);
            return ResponseEntity.ok(oldBoard);
        }
        catch (Exception e){
            return ResponseEntity.status(401).build();
        }
    }
}

