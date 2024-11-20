INSERT INTO movie_tags (movie_id, tag_id)
SELECT m.id, t.id
FROM movies m
         JOIN tags t ON t.name IN ('fantasy')
WHERE m.title = 'The lord of the rings';

INSERT INTO movie_tags (movie_id, tag_id)
SELECT m.id, t.id
FROM movies m
         JOIN tags t ON t.name IN ('vietnam', 'swearing')
WHERE m.title = 'Full metal jacket';

INSERT INTO movie_tags (movie_id, tag_id)
SELECT m.id, t.id
FROM movies m
         JOIN tags t ON t.name IN ('swearing')
WHERE m.title = 'Big Lebowski';

INSERT INTO movie_tags (movie_id, tag_id)
SELECT m.id, t.id
FROM movies m
         JOIN tags t ON t.name IN ('swearing', 'plot twist', 'don''t let your kids watch it')
WHERE m.title = 'Thursday';