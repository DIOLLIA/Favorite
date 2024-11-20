package lock.stock.twosmokingbarrels.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class MovieProps {
    @Value("${app.movies.imageBaseUrl}")
    private String imageBaseUrl;
}
