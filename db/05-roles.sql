DO
$do$
BEGIN
   -- Creamos un rol genérico para la aplicación.
   -- La contraseña real se sincronizará desde el .env al levantar el contenedor.
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles 
      WHERE  rolname = 'app_user') THEN
      CREATE ROLE app_user WITH LOGIN PASSWORD 'placeholder_init_pass';
   END IF;
END
$do$;

-- 1. Permisos de esquema
GRANT USAGE ON SCHEMA public TO app_user;

-- 2. Permisos de SELECT únicamente a tus 5 vistas
GRANT SELECT ON vw_games_popularity_ranking TO app_user;
GRANT SELECT ON vw_lowest_performer_per_game TO app_user;
GRANT SELECT ON vw_lowest_performer_per_team TO app_user;
GRANT SELECT ON vw_player_global_ranking TO app_user;
GRANT SELECT ON vw_top_teams TO app_user;

-- 3. Bloqueo total a las tablas base para cumplir con seguridad
REVOKE ALL ON games, teams, players, matches, scores FROM app_user;