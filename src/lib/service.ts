import pool from './db';

// Reporte 1: Ranking General
export async function getPlayerRanking(limit: number, offset: number) {
  const res = await pool.query(
    'SELECT * FROM vw_player_global_ranking ORDER BY "Posicion Global" ASC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return res.rows;
}

// Reporte 2: Equipos con Filtro
export async function getTeamPoints(search: string = '') {
  const res = await pool.query(
    'SELECT * FROM vw_top_teams WHERE "Equipo" ILIKE $1 ORDER BY "Puntaje Total" DESC',
    [`%${search}%`]
  );
  return res.rows;
}