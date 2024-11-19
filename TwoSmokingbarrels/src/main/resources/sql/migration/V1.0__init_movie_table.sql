CREATE TABLE movies (
                        id SERIAL PRIMARY KEY,
                        title VARCHAR(255),
                        description VARCHAR(999),
                        image_path VARCHAR(255)
);

INSERT INTO movies (title, description, image_path)
VALUES ('TLOTR', 'The lord of the rings', '/movies/TLOTR.jpg');
INSERT INTO movies (title, description, image_path)
VALUES ('Full metal jacket', 'private heap, Vietnam and more', '/movies/FullMetalJacket.jpg');