package lock.stock.twosmokingbarrels.service;

import lock.stock.twosmokingbarrels.models.MovieModel;

import java.util.List;


public interface MovieSvc {

    List<MovieModel> getMovieByWordInTheName();

    List<MovieModel> getMovies();

    List<MovieModel> getMoviesWithPagination(int limit, int offset);

    long getMoviesCount();
}
