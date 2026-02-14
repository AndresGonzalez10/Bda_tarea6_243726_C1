-- db/06_roles.sql
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
      CREATE ROLE app_user WITH LOGIN PASSWORD 'milo123';
   END IF;
END
$do$;

GRANT CONNECT ON DATABASE postgres123 TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;

GRANT SELECT ON vw_games_popularity_ranking TO app_user;
GRANT SELECT ON vw_lowest_performer_per_game TO app_user;
GRANT SELECT ON vw_lowest_performer_per_team TO app_user;
GRANT SELECT ON vw_player_global_ranking TO app_user;
GRANT SELECT ON vw_top_teams TO app_user;


REVOKE ALL ON games, teams, players, matches, scores FROM app_user;