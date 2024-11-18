package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.dao.MovieRepo;
import lock.stock.twosmokingbarrels.models.MovieModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieImpl implements MovieSvc {
    private final Transformer movieTransformer;
    private final MovieRepo movieRepo;

    @Autowired //this annotation could be erased. Here just for clarity
    public MovieImpl(Transformer movieTransformer, MovieRepo movieRepo) {
        this.movieTransformer = movieTransformer;
        this.movieRepo = movieRepo;
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

        Pageable pageable = PageRequest.of(offset, limit);
        return movieRepo.findAll(pageable).getContent()
                .stream()
                .map(movieTransformer)
                .toList();
    }

    @Override
    public long getMoviesCount() {
        return movieRepo.count();
    }

}
