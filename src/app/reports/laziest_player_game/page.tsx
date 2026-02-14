import { getLaziestByGame } from '../../../lib/service';
import Link from 'next/link';

export default async function LaziestGamePage() {
  const games = await getLaziestByGame();

  return (
    <main className="min-h-screen bg-[#0a0c10] text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <Link href="/" className="text-blue-500 font-bold hover:underline">← DASHBOARD</Link>
          <h1 className="text-3xl font-black italic text-amber-500 uppercase tracking-tighter">
            MENOR PUNTAJE <span className="text-white">POR JUEGO</span>
          </h1>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800/50 text-slate-500 text-xs uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Videojuego</th>
                <th className="p-6">Jugador</th>
                <th className="p-6 text-right">Puntos Obtenidos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {games.map((g: any) => (
                <tr key={g.Videojuego} className="hover:bg-amber-500/[0.03] transition-all">
                  <td className="p-6 font-black text-white italic">{g.Videojuego}</td>
                  <td className="p-6 font-bold text-slate-300 uppercase">{g["Jugador Menor Puntaje"]}</td>
                  <td className="p-6 text-right font-mono font-black text-amber-500 text-xl">
                    {g["Puntos Obtenidos"]}
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