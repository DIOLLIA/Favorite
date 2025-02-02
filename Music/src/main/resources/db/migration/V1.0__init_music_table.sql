CREATE TABLE bands (
                        id SERIAL PRIMARY KEY,
                        band_name VARCHAR(255),
                        description VARCHAR(999),
                        image_path VARCHAR(255)
);

INSERT INTO bands (band_name, description, image_path)
VALUES ('RAMMSTEIN', 'German metal', '/music_images/rammstein.jpg');
INSERT INTO bands (band_name, description, image_path)
VALUES ('Slipknot', 'Maski show', '/music_images/slipknot.jpg');
INSERT INTO bands (band_name, description, image_path)
VALUES ('Korn','So blind','/music_images/korn.jpg');
INSERT INTO bands (band_name, description, image_path)
VALUES ('Disturbed','eeuu agh agh agh agh','/music_images/disturbed.jpg');
