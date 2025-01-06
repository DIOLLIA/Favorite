package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.config.MovieProps;
import lock.stock.twosmokingbarrels.dao.TagRepo;
import lock.stock.twosmokingbarrels.entity.MovieEntity;
import lock.stock.twosmokingbarrels.entity.TagEntity;
import lock.stock.twosmokingbarrels.models.MovieModel;
import lock.stock.twosmokingbarrels.models.TagModel;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class Transformer implements Function<MovieEntity, MovieModel> {
    private static final String IMG_SERVER_MOVIE_PATH = "/movie_images/";
    private final MovieProps movieProps;
    private final TagRepo tagRepo;

    public Transformer(MovieProps movieProps, TagRepo tagRepo) {
        this.movieProps = movieProps;
        this.tagRepo = tagRepo;
    }

    @Override
    public MovieModel apply(MovieEntity movieEntity) {
        return new MovieModel(
                movieEntity.getTitle(),
                movieEntity.getDescription(),
                buildFullImagePath(movieEntity.getRelativeImagePath()),
                buildTags(movieEntity.getTags()));
    }

    public MovieEntity createMovie(String title, String description, String imageName, String tags) {

        return MovieEntity.builder()
                .title(title)
                .description(description)
                .relativeImagePath(getImagePath(imageName))
                .tags(getTags(tags)).build();
    }

    private String getImagePath(String imgName) {
        return IMG_SERVER_MOVIE_PATH + imgName;
    }

    private Set<TagEntity> getTags(String tags) {
        List<String> tagsArray = Stream.of(tags.split(","))
                .map(tag -> "'" + tag.trim() + "'").toList(); // todo add validation for existent tag
        String tagQuery = String.join(",", tagsArray);

        return tagRepo.findByNames(tagQuery);
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
