package lock.stock.twosmokingbarrels.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lock.stock.twosmokingbarrels.MovieTrack;
import lock.stock.twosmokingbarrels.MovieTracks;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

@Repository
public class OstRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public MovieTracks findMoviesByBandName(String name) {
        String sql = """
            SELECT m.title AS movieTitle, o.track AS track
            FROM ost o
            JOIN movies m ON o.movie_id = m.id
            WHERE o.band_name = :bandName
        """;

        var results = entityManager.createNativeQuery(sql)
                .setParameter("bandName", name)
                .getResultList();

        MovieTracks.Builder mt = MovieTracks.newBuilder();

        for (Object result : results) {
            Object[] row = (Object[]) result;
            String movieTitle = (String) row[0];
            String track = (String) row[1];

            MovieTrack movieTrack = MovieTrack.newBuilder()
                    .setMovieTitle(movieTitle)
                    .setTrack(track)
                    .build();

            mt.addMovieTracks(movieTrack).build();
        }

        return mt.build();
    }
}

