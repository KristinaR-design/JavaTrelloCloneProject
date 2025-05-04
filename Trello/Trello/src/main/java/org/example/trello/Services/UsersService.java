package org.example.trello.Services;
import org.example.trello.Entity.User;
import org.example.trello.Entity.Board;
import org.example.trello.Repositories.UserRepository;
import org.example.trello.Repositories.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService implements UserDetailsService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final PasswordEncoder passwordEncoder;

    public void createUser(User user) {
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public Long getUserByLogin(String login) {return userRepository.findByLogin(login).get().getId();}

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<Board> getUserBoards(Long userId) {
        return userRepository.findBoardsByUserId(userId);
    }

    public void addBoardToUser(Long userId, Long boardId) {
        User user = userRepository.findById(userId).orElseThrow();
        Board board = boardRepository.findById(boardId).orElseThrow();
        user.getBoards().add(board);
        userRepository.save(user);
    }

    public void removeBoardFromUser(Long userId, Long boardId) {
        User user = userRepository.findById(userId).orElseThrow();
        Board board = boardRepository.findById(boardId).orElseThrow();
        user.getBoards().remove(board);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByLogin(username).orElseThrow();
    }
}
