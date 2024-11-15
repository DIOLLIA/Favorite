package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.models.MovieModel;

import java.util.List;


public interface MovieSvc {
    MovieModel getMovie();

    List<MovieModel> getMovies();
}
