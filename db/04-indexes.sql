-- 1. Índice para acelerar los JOINs entre la tabla de puntuaciones y los jugadores.
CREATE INDEX IF NOT EXISTS idx_scores_player_id ON scores(player_id);

-- 2. Índice para acelerar los JOINs entre jugadores y equipos.
CREATE INDEX IF NOT EXISTS idx_players_team_id ON players(team_id);

-- 3. Índice para optimizar las consultas por juego en la tabla de partidas.
CREATE INDEX IF NOT EXISTS idx_matches_game_id ON matches(game_id);