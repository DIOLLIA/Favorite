package lock.stock.twosmokingbarrels.controller;

import lock.stock.twosmokingbarrels.models.MovieModel;
import lock.stock.twosmokingbarrels.service.MovieSvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {

    private final MovieSvc movie;

    @Autowired //this annotation could be erased. Here just for clarity
    public MovieController(MovieSvc movie) {
        this.movie = movie;
    }

    @GetMapping("/movies")
    public List<MovieModel> movies() {
        return movie.getMovies();
    }
}
