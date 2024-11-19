package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.config.MovieProps;
import lock.stock.twosmokingbarrels.entity.MovieEntity;
import lock.stock.twosmokingbarrels.models.MovieModel;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class Transformer implements Function<MovieEntity, MovieModel> {
    private final MovieProps movieProps;

    public Transformer(MovieProps movieProps) {
        this.movieProps = movieProps;
    }

    @Override
    public MovieModel apply(MovieEntity movieEntity) {
        return new MovieModel(
                movieEntity.getTitle(),
                movieEntity.getDescription(),
                buildFullImagePath(movieEntity.getRelativeImagePath()));
    }

    private String buildFullImagePath(String relativePath) {
        return movieProps.getImageBaseUrl() + relativePath;
    }
}
