CREATE TABLE movies (
                        id SERIAL PRIMARY KEY,
                        title VARCHAR(255),
                        description VARCHAR(999),
                        image_path VARCHAR(255)
);

INSERT INTO movies (title, description, image_path)
VALUES ('The lord of the rings', 'epic precious', '/movie_images/TLOTR.jpg');
INSERT INTO movies (title, description, image_path)
VALUES ('Full metal jacket', 'private heap, Vietnam and more', '/movie_images/FullMetalJacket.jpg');
INSERT INTO movies (title, description, image_path)
VALUES ('Thursday','inscription on the jacket: C@NT','/movie_images/Thursday.jpg');
INSERT INTO movies (title, description, image_path)
VALUES ('Big Lebowski','Dude, white russian and ingenious plan','/movie_images/BigLebowski.jpg');
