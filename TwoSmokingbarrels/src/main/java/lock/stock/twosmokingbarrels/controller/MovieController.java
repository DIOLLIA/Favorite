package lock.stock.twosmokingbarrels.controller;

import lock.stock.twosmokingbarrels.models.MovieModel;
import lock.stock.twosmokingbarrels.models.MoviePageModel;
import lock.stock.twosmokingbarrels.service.MovieSvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
public class MovieController {

    private final MovieSvc movie;
    private final MessageSource messageSource;

    @Autowired //this annotation could be erased. Here just for clarity
    public MovieController(MovieSvc movie, MessageSource messageSource) {
        this.movie = movie;
        this.messageSource = messageSource;
    }

    @GetMapping("/movies")
    public ResponseEntity<MoviePageModel> movies(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "3") int limit,
            @RequestParam(defaultValue = "en") String lang) {

        List<MovieModel> movies = movie.getMoviesWithPagination(limit, offset);
        var totalCount = movie.getMoviesCount();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", String.valueOf(totalCount));

        var msgs = getMessages(lang, "movie.main.greetings");
        return ResponseEntity.ok().headers(headers).body(new MoviePageModel(movies, msgs));
    }

    private Map<String, String> getMessages(String lang, String... keys) {
        Map<String, String> messages = new HashMap<>();
        for (var key : keys) {
            messages.put(key, messageSource.getMessage(key, null, new Locale(lang)));
        }
        return messages;
    }
}


/*
It is possible to use filters also to allow CORS requests
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
*/