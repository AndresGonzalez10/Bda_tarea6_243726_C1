import { getTeamPoints } from '../../../lib/service';
import { z } from 'zod';
import Link from 'next/link';

const SearchSchema = z.object({
  search: z.string().optional().default(''),
});

export default async function TeamPointsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {
  const params = await searchParams;
  const { search } = SearchSchema.parse(params);
  
  const teams = await getTeamPoints(search);

  return (
    <main className="min-h-screen bg-[#0a0c10] text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="text-blue-500 font-bold hover:underline tracking-tighter uppercase text-xs">← DASHBOARD</Link>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            PUNTUACIÓN POR <span className="text-blue-600">EQUIPOS</span>
          </h1>
        </div>

        {/* Buscador */}
        <form className="mb-8 flex gap-4">
          <input 
            type="text" 
            name="search"
            defaultValue={search}
            placeholder="Buscar equipo..." 
            className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-bold"
          />
          <button 
            type="submit" 
            className="bg-blue-600 px-8 rounded-2xl font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
          >
            FILTRAR
          </button>
        </form>

        {/* Tabla Gamer */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-500 text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Equipo</th>
                <th className="p-6 text-center text-blue-400">Puntaje Total</th>
                <th className="p-6 text-right">Promedio / Jugador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {teams.length > 0 ? (
                teams.map((team: any) => (
                  <tr key={team.Equipo} className="hover:bg-blue-500/5 transition-all group">
                    <td className="p-6 font-black text-lg group-hover:text-blue-400 italic uppercase">
                      {team.Equipo}
                    </td>
                    <td className="p-6 text-center font-mono font-bold text-xl">
                      {team["Puntaje Total Equipo"]}
                    </td>
                    <td className="p-6 text-right font-black text-emerald-400 font-mono italic text-xl">
                      {team["Promedio Puntos por Jugador"]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-slate-600 italic font-bold uppercase tracking-widest">
                    No se encontraron resultados para "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}