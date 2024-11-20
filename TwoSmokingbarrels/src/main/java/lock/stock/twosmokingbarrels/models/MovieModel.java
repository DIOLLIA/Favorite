package lock.stock.twosmokingbarrels.models;

import java.util.Set;

public record MovieModel(String title,
                         String description,
                         String imagePath,
                         Set<TagModel> tags) {
}
