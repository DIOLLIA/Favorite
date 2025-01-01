package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.dao.MovieRepo;
import lock.stock.twosmokingbarrels.models.MovieModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class MovieImpl implements MovieSvc {
    private final Transformer movieTransformer;
    private final MovieRepo movieRepo;
    private final Transformer transformer;

    @Autowired //this annotation could be erased. Here just for clarity
    public MovieImpl(Transformer movieTransformer, MovieRepo movieRepo, Transformer transformer) {
        this.movieTransformer = movieTransformer;
        this.movieRepo = movieRepo;
        this.transformer = transformer;
    }

    @Override
    public List<MovieModel> getMovieByWordInTheName() {
        return null;
    }

    @Override
    public List<MovieModel> getMovies() {
        return movieRepo.findAllBy().stream()
                .map(movieTransformer).toList();
    }

    @Override
    public List<MovieModel> getMoviesWithPagination(int limit, int offset) {
        log.info("getMoviesWithPagination for limit {} and offset {}", limit, offset);
//todo make one custom request to the DB
        Pageable pageable = PageRequest.of(offset, limit);
        var movies = movieRepo.findAll(pageable).getContent()
                .stream()
                .map(movieTransformer)
                .toList();
        log.info("getMoviesWithPagination found {} to return", movies.size());
        return movies;
    }

    @Override
    public long getMoviesCount() {
        return movieRepo.count();
    }

    @Override
    public void saveMovie(String title, String description, String imageName, String tags) {
        var movie = transformer.createMovie(title, description, imageName, tags);
        movieRepo.save(movie);
    }

}
