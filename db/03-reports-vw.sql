-- ==============================================================================
-- VIEW 1: Ranking general de jugadores
-- Qué devuelve: El ranking global de los jugadores basado en la suma total de sus puntos en el torneo. 
-- Grain: 1 fila por jugador. 
-- Métricas: Puntaje Total, Partidas Jugadas y Posición Global. 
-- VERIFY 1: SELECT * FROM vw_player_global_ranking LIMIT 5;
-- VERIFY 2: SELECT * FROM vw_player_global_ranking WHERE "Equipo" = 'FuerzaChida'; 
-- ==============================================================================
CREATE OR REPLACE VIEW vw_player_global_ranking AS
WITH PlayerTotals AS (
    SELECT 
        p.id AS player_id,
        p.nickname,
        t.name AS team_name,
        SUM(COALESCE(s.points, 0)) AS total_points,
        COUNT(s.id) AS matches_played
    FROM players p
    LEFT JOIN teams t ON p.team_id = t.id
    LEFT JOIN scores s ON p.id = s.player_id
    GROUP BY p.id, p.nickname, t.name
)
SELECT 
    nickname AS "Jugador",
    team_name AS "Equipo",
    total_points AS "Puntaje Total",
    matches_played AS "Partidas Jugadas",
    RANK() OVER (ORDER BY total_points DESC) AS "Posicion Global"
FROM PlayerTotals;


-- ==============================================================================
-- VIEW 2: Equipos con mayor cantidad de puntos (Equipo Ganador)
-- Qué devuelve: Los equipos ordenados por su puntaje acumulado, mostrando solo aquellos que han participado activamente. 
-- Grain: 1 fila por equipo. 
-- Métricas: Puntaje Total del Equipo y Promedio de Puntos por Jugador. 
-- VERIFY 1: SELECT * FROM vw_top_teams; 
-- VERIFY 2: SELECT "Equipo", "Puntaje Total Equipo" FROM vw_top_teams LIMIT 1; 
-- ==============================================================================
CREATE OR REPLACE VIEW vw_top_teams AS
SELECT 
    t.name AS "Equipo",
    SUM(COALESCE(s.points, 0)) AS "Puntaje Total Equipo",
    ROUND(AVG(COALESCE(s.points, 0)), 2) AS "Promedio Puntos por Jugador"
FROM teams t
JOIN players p ON t.id = p.team_id
JOIN scores s ON p.id = s.player_id
GROUP BY t.id, t.name
HAVING SUM(COALESCE(s.points, 0)) > 0
ORDER BY "Puntaje Total Equipo" DESC;


-- ==============================================================================
-- VIEW 3: Ranking de juegos por popularidad/puntos
-- Qué devuelve: El total de puntos generados en cada juego, clasificando su nivel de actividad.
-- Grain: 1 fila por videojuego. 
-- Métricas: Total de Partidas, Puntos Totales Generados y Nivel de Actividad. 
-- VERIFY 1: SELECT * FROM vw_games_popularity_ranking; 
-- VERIFY 2: SELECT "Videojuego", "Nivel de Actividad" FROM vw_games_popularity_ranking WHERE "Nivel de Actividad" = 'Alta Competencia';
-- ==============================================================================
CREATE OR REPLACE VIEW vw_games_popularity_ranking AS
SELECT 
    g.name AS "Videojuego",
    COUNT(DISTINCT m.id) AS "Total Partidas",
    SUM(COALESCE(s.points, 0)) AS "Puntos Totales Generados",
    CASE 
        WHEN SUM(COALESCE(s.points, 0)) >= 3000 THEN 'Alta Competencia'
        WHEN SUM(COALESCE(s.points, 0)) BETWEEN 1 AND 2999 THEN 'Competencia Media'
        ELSE 'Sin Actividad'
    END AS "Nivel de Actividad"
FROM games g
LEFT JOIN matches m ON g.id = m.game_id
LEFT JOIN scores s ON m.id = s.match_id
GROUP BY g.id, g.name
ORDER BY "Puntos Totales Generados" DESC;


-- ==============================================================================
-- VIEW 4: Jugador con menor desempeño por equipo
-- Qué devuelve: El jugador de cada equipo que ha aportado la menor cantidad de puntos en todo el torneo. 
-- Grain: 1 fila por equipo 
-- Métricas: Puntos Aportados y Estado (Sustitución o Entrenamiento). 
-- VERIFY 2: SELECT * FROM vw_lowest_performer_per_team WHERE "Equipo" = 'PelusaCaligari'; 
-- ==============================================================================
CREATE OR REPLACE VIEW vw_lowest_performer_per_team AS
WITH PlayerScores AS (
    SELECT 
        t.name AS team_name,
        p.nickname AS player_name,
        SUM(COALESCE(s.points, 0)) AS total_points,
        ROW_NUMBER() OVER(PARTITION BY t.name ORDER BY SUM(COALESCE(s.points, 0)) ASC) as "rank_in_team"
    FROM teams t
    JOIN players p ON t.id = p.team_id
    LEFT JOIN scores s ON p.id = s.player_id
    GROUP BY t.id, t.name, p.id, p.nickname
)
SELECT 
    team_name AS "Equipo",
    player_name AS "Jugador a Mejorar",
    total_points AS "Puntos Aportados",
    CASE 
        WHEN total_points = 0 THEN 'Requiere Sustitución'
        ELSE 'Requiere Entrenamiento'
    END AS "Estado"
FROM PlayerScores
WHERE rank_in_team = 1;


-- ==============================================================================
-- VIEW 5: Jugador con menor desempeño por juego
-- Qué devuelve: El jugador que obtuvo el menor puntaje acumulado en cada juego específico.
-- Grain: 1 fila por videojuego 
-- Métricas: Puntos Obtenidos. 
-- VERIFY 1: SELECT * FROM vw_lowest_performer_per_game; 
-- VERIFY 2: SELECT * FROM vw_lowest_performer_per_game WHERE "Videojuego" = 'Valorant'; 
-- ==============================================================================
CREATE OR REPLACE VIEW vw_lowest_performer_per_game AS
WITH GameScores AS (
    SELECT 
        g.name AS game_name,
        p.nickname AS player_name,
        SUM(COALESCE(s.points, 0)) AS total_points,
        ROW_NUMBER() OVER(PARTITION BY g.name ORDER BY SUM(COALESCE(s.points, 0)) ASC) as "rank_in_game"
    FROM games g
    JOIN matches m ON g.id = m.game_id
    JOIN scores s ON m.id = s.match_id
    JOIN players p ON s.player_id = p.id
    GROUP BY g.id, g.name, p.id, p.nickname
    HAVING COUNT(m.id) > 0
)
SELECT 
    game_name AS "Videojuego",
    player_name AS "Jugador Menor Puntaje",
    total_points AS "Puntos Obtenidos"
FROM GameScores
WHERE rank_in_game = 1;