package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.entity.MovieEntity;
import lock.stock.twosmokingbarrels.models.MovieModel;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class Transformer implements Function<MovieEntity, MovieModel> {

    @Override
    public MovieModel apply(MovieEntity movieEntity) {
        return new MovieModel(movieEntity.getTitle(), movieEntity.getDescription());
    }
}
