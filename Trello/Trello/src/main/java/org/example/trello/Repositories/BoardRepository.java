package org.example.trello.Repositories;

import org.example.trello.Entity.Board;
import org.example.trello.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT u FROM Board b JOIN b.users u WHERE b.id = :boardId")
    List<User> findUsersByBoardId(Long boardId);


}