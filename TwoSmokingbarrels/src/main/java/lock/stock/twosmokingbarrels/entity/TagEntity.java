package lock.stock.twosmokingbarrels.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name="tags")
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
}
