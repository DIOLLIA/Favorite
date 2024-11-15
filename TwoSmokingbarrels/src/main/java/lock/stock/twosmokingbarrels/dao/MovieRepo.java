package lock.stock.twosmokingbarrels.dao;

import lock.stock.twosmokingbarrels.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepo extends JpaRepository<MovieEntity, Long> {
}
