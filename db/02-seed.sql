-- 5 Juegos
INSERT INTO games (name) VALUES 
('League of Legends'), 
('Overwatch'), 
('Valorant'), 
('Marvel Rivals'), 
('Dead by daylight');

-- 8 Equipos
INSERT INTO teams (name) VALUES 
('SKP'), ('NullSector'), ('FuerzaChida'), ('PelusaCaligari'), 
('S.T.A.R.S.'), ('UmbrellaCorps'), ('Invocadores'), ('Survivors');

-- 40 Jugadores
INSERT INTO players (team_id, nickname) VALUES 
-- Equipo 1 
(1, 'PsychoLY'), (1, 'OddityGabo'), (1, 'Arturosaid04'), (1, 'Erickdechiles'), (1, 'OmarGP10'),
-- Equipo 2 
(2, 'Andres'), (2, 'Gabriel'), (2, 'Arturo'), (2, 'Erick'), (2, 'Omar'),
-- Equipo 3 
(3, 'Quico'), (3, 'Chavo'), (3, 'Rondamon'), (3, 'nionio'), (3, 'Godines'),
-- Equipo 4 
(4, 'Criscross'), (4, 'Fedelobo'), (4, 'Werever'), (4, 'Isra'), (4, 'Wero'),
-- Equipo 5 
(5, 'Chris'), (5, 'Jill'), (5, 'Barry'), (5, 'Rebecca'), (5, 'Albert'),
-- Equipo 6 
(6, 'Hunk'), (6, 'Nicholai'), (6, 'Mikhail'), (6, 'Carlos'), (6, 'Tyrell'),
-- Equipo 7 
(7, 'Marcus'), (7, 'Riden'), (7, 'Snake'), (7, 'Kirby'), (7, 'Mario'),
-- Equipo 8 
(8, 'Sheva'), (8, 'Piers'), (8, 'Helena'), (8, 'Sherry'), (8, 'Leon');

-- Partidas
INSERT INTO matches (game_id) VALUES 
(1), (1), (2), (2), (3), (3), (4), (4), (5), (5);


-- 5. puntuaciones
INSERT INTO scores (match_id, player_id, points) VALUES 
-- Partida 1 
(1, 1, 300), (1, 2, 450), (1, 3, 600), (1, 4, 550), (1, 5, 200),
(1, 6, 250), (1, 7, 400), (1, 8, 500), (1, 9, 450), (1, 10, 150),

-- Partida 3 
(3, 21, 1200), (3, 22, 950), (3, 23, 800), (3, 24, 600), (3, 25, 1500),
(3, 26, 1100), (3, 27, 850), (3, 28, 700), (3, 29, 900), (3, 30, 1050),

-- Partida 5 
(5, 11, 200), (5, 12, 150), (5, 13, 350), (5, 14, 400), (5, 15, 100),
(5, 16, 180), (5, 17, 220), (5, 18, 300), (5, 19, 250), (5, 20, 120),

-- Partida 9 
(9, 31, 500), (9, 32, 450), (9, 33, 300), (9, 34, 600), (9, 35, 700),
(9, 36, 400), (9, 37, 550), (9, 38, 350), (9, 39, 450), (9, 40, 800),

-- Partida 10 
(10, 31, 600), (10, 32, 500), (10, 35, 800), (10, 38, 400), (10, 40, 950);

INSERT INTO scores (match_id, player_id, points) VALUES 
-- Partida 2 
(2, 11, 400), (2, 12, 350), (2, 13, 500), (2, 14, 450), (2, 15, 200),
(2, 16, 600), (2, 17, 700), (2, 18, 550), (2, 19, 300), (2, 20, 400),

-- Partida 4 
(4, 31, 800), (4, 32, 900), (4, 33, 750), (4, 34, 850), (4, 35, 950),
(4, 36, 600), (4, 37, 700), (4, 38, 500), (4, 39, 650), (4, 40, 550),

-- Partida 6 
(6, 1, 250), (6, 2, 300), (6, 3, 200), (6, 4, 400), (6, 5, 350),
(6, 21, 500), (6, 22, 450), (6, 23, 600), (6, 24, 550), (6, 25, 400),

-- Partida 7 
(7, 6, 700), (7, 7, 650), (7, 8, 800), (7, 9, 750), (7, 10, 600),
(7, 26, 900), (7, 27, 850), (7, 28, 950), (7, 29, 800), (7, 30, 700),

-- Partida 8 
(8, 11, 400), (8, 12, 450), (8, 13, 300), (8, 14, 500), (8, 15, 350),
(8, 31, 600), (8, 32, 550), (8, 33, 700), (8, 34, 650), (8, 35, 500);