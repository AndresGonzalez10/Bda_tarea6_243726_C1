import { getLaziestByTeam } from '../../../lib/service';
import Link from 'next/link';

export default async function LaziestTeamPage() {
  const players = await getLaziestByTeam();

  return (
    <main className="min-h-screen bg-[#0a0c10] text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <Link href="/" className="text-blue-500 font-bold hover:underline">← DASHBOARD</Link>
          <h1 className="text-3xl font-black italic text-red-500 uppercase tracking-tighter">
            BAJO DESEMPEÑO <span className="text-white">POR EQUIPO</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {players.map((p: any) => (
            <div key={p.Equipo} className="bg-slate-900 border border-red-900/20 p-6 rounded-[2rem] shadow-xl group">
              <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-1">{p.Equipo}</p>
              <h2 className="text-2xl font-bold text-white mb-4 uppercase italic group-hover:text-red-400 transition-colors">
                {p["Jugador a Mejorar"]}
              </h2>
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-slate-800">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Puntos</p>
                  <p className="text-xl font-mono font-bold text-red-400">{p["Puntos Aportados"]}</p>
                </div>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${
                  p.Estado === 'Requiere Sustitución' ? 'bg-red-600 text-white' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {p.Estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}