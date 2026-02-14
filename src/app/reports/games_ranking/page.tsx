import { getGamesRanking } from '../../../lib/service';
import Link from 'next/link';

export default async function GamesRankingPage() {
  const games = await getGamesRanking();

  return (
    <main className="min-h-screen bg-[#0a0c10] text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <Link href="/" className="text-blue-500 font-bold hover:underline tracking-widest uppercase text-xs">← Dashboard</Link>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Popularidad de <span className="text-blue-600">Juegos</span></h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game: any) => (
            <div key={game.Videojuego} className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] hover:border-blue-500/50 transition-all shadow-xl group">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-black text-white italic group-hover:text-blue-400">{game.Videojuego}</h2>
                <div className={`px-4 py-1 rounded-full text-[10px] font-bold border ${
                  game["Nivel de Actividad"] === 'Alta Competencia' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {game["Nivel de Actividad"]}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 text-center">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Partidas</p>
                  <p className="text-xl font-mono font-bold">{game["Total Partidas"]}</p>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 text-center">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Puntos</p>
                  <p className="text-xl font-mono font-bold text-emerald-400">{game["Puntos Totales Generados"]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}