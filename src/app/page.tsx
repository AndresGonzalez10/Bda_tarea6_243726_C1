import Link from 'next/link';

export default function DashboardHome() {
  const reports = [
    {
      id: 1,
      title: 'Ranking General de Jugadores',
      description: 'El top global de jugadores basado en la suma total de sus puntos en el torneo.',
      icon: '🏆',
      href: '/reports/1'
    },
    {
      id: 2,
      title: 'Equipos Ganadores',
      description: 'Los equipos ordenados por su puntaje acumulado y su promedio de puntos.',
      icon: '🛡️',
      href: '/reports/2'
    },
    {
      id: 3,
      title: 'Popularidad de Juegos',
      description: 'Nivel de actividad y puntos totales generados en cada videojuego.',
      icon: '🎮',
      href: '/reports/3'
    },
    {
      id: 4,
      title: 'Áreas de Mejora por Equipo',
      description: 'El jugador de cada equipo que ha aportado la menor cantidad de puntos.',
      icon: '📉',
      href: '/reports/4'
    },
    {
      id: 5,
      title: 'Menor Desempeño por Juego',
      description: 'El jugador que obtuvo el menor puntaje histórico en cada juego específico.',
      icon: '⚠️',
      href: '/reports/5'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
            Torneo Multijuegos: Estadisticas
          </h1>
          <p className="text-slate-400 text-lg">
            Sistema de analisis de resultados del Torneo
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Link 
              key={report.id} 
              href={report.href}
              className="block group"
            >
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-full transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.2)] hover:-translate-y-1">
                <div className="text-4xl mb-4">{report.icon}</div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {report.title} 
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {report.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}