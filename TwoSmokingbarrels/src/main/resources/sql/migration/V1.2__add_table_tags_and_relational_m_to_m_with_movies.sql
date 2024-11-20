CREATE TABLE tags
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE movie_tags (
                            movie_id BIGINT NOT NULL,
                            tag_id BIGINT NOT NULL,
                            PRIMARY KEY (movie_id, tag_id),
                            CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
                            CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);

INSERT INTO tags (name) VALUES ('swearing'),
                               ('fantasy'),
                               ('vietnam'),
                               ('plot twist'),
                               ('don''t let your kids watch it');
