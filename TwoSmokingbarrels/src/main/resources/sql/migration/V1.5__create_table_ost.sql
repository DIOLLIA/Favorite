CREATE TABLE ost
(
    id        BIGSERIAL PRIMARY KEY,
    band_name VARCHAR(150) NOT NULL,
    track     VARCHAR(100) NOT NULL,
    movie_id  BIGINT       NOT NULL,
    CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE
);
-- todo change table to store cinema name and pic + small desc about OST timecode bcz not always we have id of the cinema in the original table BUT it can still be reffered if exist
-- todo change insert by cinema name
INSERT INTO ost (band_name, track, movie_id)
values ('slipknot', 'my plague', 2),
       ('slipknot', 'wait and bleed', 3)
