package org.example.trello.Repositories;
import org.example.trello.Entity.User;
import org.example.trello.Entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String login);

    @Query("SELECT b FROM User u JOIN u.boards b WHERE u.id = :userId")
    List<Board> findBoardsByUserId(Long userId);

}
