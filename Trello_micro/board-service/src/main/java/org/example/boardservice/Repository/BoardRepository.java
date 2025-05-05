package org.example.boardservice.Repository;

import org.example.boardservice.Entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Long> {
    List<Board> findByUserId(Long UserId);
}
