package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.models.MovieModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieImpl implements MovieSvc {
    @Override
    public MovieModel getMovie() {
        return new MovieModel("Lock Stock and Two smoking barrels", "I like that much");
    }

    @Override
    public List<MovieModel> getMovies() {
        return List.of();
    }
}
