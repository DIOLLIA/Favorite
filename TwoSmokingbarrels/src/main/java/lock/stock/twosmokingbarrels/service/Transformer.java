package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.config.MovieProps;
import lock.stock.twosmokingbarrels.entity.MovieEntity;
import lock.stock.twosmokingbarrels.entity.TagEntity;
import lock.stock.twosmokingbarrels.models.MovieModel;
import lock.stock.twosmokingbarrels.models.TagModel;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

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
                buildFullImagePath(movieEntity.getRelativeImagePath()),
                buildTags(movieEntity.getTags()));
    }

    private String buildFullImagePath(String relativePath) {
        return movieProps.getImageBaseUrl() + relativePath;
    }

    private Set<TagModel> buildTags(Set<TagEntity> tags) {
        return tags.stream()
                .map(tagEntity -> new TagModel(tagEntity.getName()))
                .collect(Collectors.toSet());
    }
}
