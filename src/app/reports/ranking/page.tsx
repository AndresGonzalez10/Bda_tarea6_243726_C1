import { getPlayerRanking } from '../../../lib/service';
import { z } from 'zod';
import Link from 'next/link';

const QuerySchema = z.object({
  page: z.string().optional().transform(val => Math.max(1, Number(val) || 1)),
});

export default async function RankingPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const { page } = QuerySchema.parse(params);
  const limit = 10;
  const offset = (page - 1) * limit;

  const players = await getPlayerRanking(limit, offset);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <Link href="/" className="text-blue-500 font-bold hover:underline">← DASHBOARD</Link>
          <h1 className="text-3xl font-black italic">RANKING GLOBAL</h1>
        </header>

        {/* CONTENEDOR DE TABLA CORRECTO */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800/50 text-slate-500 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-6">Posición</th>
                <th className="p-6">Jugador / Equipo</th>
                <th className="p-6 text-right text-blue-400">Puntos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {players.map((p: any) => (
                <tr key={p.Jugador} className="hover:bg-blue-600/5 transition-colors">
                  <td className="p-6 font-mono text-xl text-slate-500">#{p["Posicion Global"]}</td>
                  <td className="p-6">
                    <div className="font-bold text-white text-lg uppercase">{p.Jugador}</div>
                    <div className="text-xs text-slate-500 font-mono italic">{p.Equipo}</div>
                  </td>
                  <td className="p-6 text-right font-black text-2xl text-emerald-400 font-mono">
                    {p["Puntaje Total"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}