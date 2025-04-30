package org.example.trello.Entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "column_id", nullable = false)
    private Columns columns;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;
}
