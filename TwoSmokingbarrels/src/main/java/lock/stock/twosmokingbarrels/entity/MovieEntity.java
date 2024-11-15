package lock.stock.twosmokingbarrels.entity;

import jakarta.persistence.*;

@Entity
@Table(name="movies")
public class MovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Автоинкремент
    private Long id;
    private String title;
    private String description;
}
