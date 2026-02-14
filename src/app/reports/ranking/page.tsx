import { getPlayerRanking } from '../../../lib/service'; // Ruta relativa corregida
import { z } from 'zod';
import Link from 'next/link';

const QuerySchema = z.object({
  page: z.string().optional().transform(val => Math.max(1, Number(val) || 1)),
});

export default async function RankingPage({ searchParams }: { searchParams: any }) {
  const { page } = QuerySchema.parse(searchParams);
  const limit = 10;
  const offset = (page - 1) * limit;

  // Llamada limpia al servicio
  const players = await getPlayerRanking(limit, offset);

  return (
    <main className="p-8 bg-slate-900 min-h-screen text-slate-100">
      {/* ... Tu código JSX de la tabla ... */}
      {players.map((player: any) => (
        <tr key={player.Jugador} className="border-t border-slate-700">
          <td className="p-4 font-mono text-blue-400">{player["Posicion Global"]}</td>
          <td className="p-4 font-bold">{player.Jugador}</td>
          <td className="p-4">{player.Equipo}</td>
          <td className="p-4 text-right text-emerald-400">{player["Puntaje Total"]}</td>
        </tr>
      ))}
      {/* ... Controles de paginación ... */}
    </main>
  );
}