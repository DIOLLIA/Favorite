package lock.stock.twosmokingbarrels.controller;

import lock.stock.twosmokingbarrels.models.MovieModel;
import lock.stock.twosmokingbarrels.service.MovieSvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieController {

    @Autowired
    private MovieSvc movie;

    @GetMapping("/movie")
    public MovieModel movie() {
        return movie.getMovie();
    }
}
