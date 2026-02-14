import pool from './db';

// 1. Ranking General de Jugadores
export async function getPlayerRanking(limit: number, offset: number) {
  const res = await pool.query(
    'SELECT * FROM vw_player_global_ranking ORDER BY "Posicion Global" ASC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return res.rows;
}

// 2. Puntos por Equipo (con buscador)
export async function getTeamPoints(search: string = '') {
  const res = await pool.query(
    `SELECT * FROM vw_top_teams 
     WHERE "Equipo" ILIKE $1 
     ORDER BY "Puntaje Total Equipo" DESC`, 
    [`%${search}%`]
  );
  return res.rows;
}

// 3. Popularidad de Juegos
export async function getGamesRanking() {
  const res = await pool.query('SELECT * FROM vw_games_popularity_ranking');
  return res.rows;
}

// 4. Bajo desempeño por Equipo
export async function getLaziestByTeam() {
  const res = await pool.query('SELECT * FROM vw_lowest_performer_per_team');
  return res.rows;
}

// 5. Bajo desempeño por Juego
export async function getLaziestByGame() {
  const res = await pool.query('SELECT * FROM vw_lowest_performer_per_game');
  return res.rows;
}