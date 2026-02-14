-- 1. Creamos el usuario/rol específico para la app de Next.js
CREATE ROLE app_torneo WITH LOGIN PASSWORD 'password_seguro_123';

-- 2. Revocamos los privilegios por defecto del esquema público
REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- 3. Le damos permiso al usuario para conectarse al esquema
GRANT USAGE ON SCHEMA public TO app_torneo;

-- 4. Otorgamos SELECT ÚNICAMENTE a las vistas
GRANT SELECT ON vw_player_global_ranking TO app_torneo;
GRANT SELECT ON vw_top_teams TO app_torneo;
GRANT SELECT ON vw_games_popularity_ranking TO app_torneo;
GRANT SELECT ON vw_lowest_performer_per_team TO app_torneo;
GRANT SELECT ON vw_lowest_performer_per_game TO app_torneo;

-- 5. Aseguramos que no tenga acceso a las tablas base
REVOKE ALL ON games, teams, players, matches, scores FROM app_torneo;