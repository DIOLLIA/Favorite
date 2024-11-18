package lock.stock.twosmokingbarrels.dao;

import lock.stock.twosmokingbarrels.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
* Spring Data JPA automatically creates an implementation for the MovieRepo interface,
* because of @Repository annotation at the interface level.
* You don't need to explicitly create the class or inject the implementation.
 */
@Repository
public interface MovieRepo extends JpaRepository<MovieEntity, Long> {
    List<MovieEntity> findAllBy();
    long count();

/* todo to write custom sqls
    @Query("SELECT m FROM MovieEntity m WHERE m.title LIKE %:title% AND m.ageOfProduce > :age")
    List<MovieEntity> findMoviesCustom(@Param("title") String title, @Param("age") int age);*/
}
