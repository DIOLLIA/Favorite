package lock.stock.twosmokingbarrels.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name="movies")
@Getter
public class MovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String imagePath;
}
