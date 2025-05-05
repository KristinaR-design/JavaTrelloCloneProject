package org.example.boardservice.Services;

import org.example.boardservice.Entity.Board;
import org.example.boardservice.Repository.BoardRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BoardService {
    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<Board> getBoardsByUser(Long userId){
        return boardRepository.findByUserId(userId);
    }

    public void addBoard(Board board){
        boardRepository.save(board);
    }

    public void deleteBoard(Long boardId){boardRepository.deleteById(boardId);}

    public Board getBoard(Long boardId){return boardRepository.findById(boardId).get();}


}
