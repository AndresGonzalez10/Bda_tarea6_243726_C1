# Tarea 6: Torneo de eSports Dashboard

> Aplicación de Inteligencia de Negocios (BI) para la gestión de torneos de videojuegos desarrollada con Next.js 15 y PostgreSQL. Utiliza una arquitectura de seguridad basada en el principio de mínimo privilegio (Vistas y Roles) orquestada íntegramente con Docker.

---

## 🚀 Inicio Rápido

El proyecto utiliza **Docker Compose** para garantizar un entorno de ejecución idéntico entre desarrollo y producción con un solo comando.

### 1. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto. **Nota:** El archivo `.env` está excluido del control de versiones por seguridad.

```bash
# Copia el ejemplo genérico
cp .env.example .env

2. Levantar el entornoEste comando construye la imagen de Next.js, levanta el contenedor de PostgreSQL y ejecuta automáticamente los scripts de esquema, semillas y roles.Bashdocker compose up -d --build
3. Acceder a la aplicaciónServicioURL / PuertoWeb Dashboardhttp://localhost:3000Base de Datos (PG)Puerto 5432📊 Arquitectura y Vistas SQLSe implementaron 5 vistas para desacoplar el esquema físico de la base de datos de la lógica de negocio consumida por el frontend.VistaReporteDescripciónvw_player_global_rankingRanking GeneralCalcula el ranking mundial de jugadores mediante agregaciones (SUM) y funciones de ventana (RANK()).vw_top_teamsDesempeño de EquiposAgrupa puntos por organización y calcula promedios de rendimiento por jugador con ROUND.vw_games_popularityPopularidadSegmenta los videojuegos por nivel de actividad utilizando lógica condicional CASE.vw_lowest_performer_per_teamÁreas de MejoraIdentifica al jugador con menor aporte de cada equipo mediante CTEs y ROW_NUMBER().vw_lowest_performer_per_gameDesempeño por JuegoLocaliza el puntaje más bajo registrado por título para análisis de balance de competencia.🛠️ Decisiones Técnicas (Trade-offs)Abstracción de Datos en VistasDecisión: El frontend nunca consulta las tablas matches o scores directamente; consume exclusivamente Vistas.Por qué: Esto permite cambiar la estructura de las tablas base sin romper el código del frontend, además de centralizar los cálculos matemáticos en el motor de la base de datos.Next.js 15 Server ComponentsDecisión: Uso de Server Components para el fetching de datos.Por qué: Al ejecutar las consultas en el servidor, no se exponen las queries SQL ni la estructura de las vistas al cliente (navegador). Las credenciales se mantienen seguras.🛡️ Modelo de Seguridad (Threat Model)Gestión de Secretos (Zero-Exposure)Cero Hardcoding: No existen contraseñas ni usuarios reales en los archivos .sql o docker-compose.yml.Inyección por Entorno: Las credenciales se inyectan en tiempo de ejecución desde el archivo .env privado.Principio de Mínimo Privilegio (RBAC)La aplicación web se conecta mediante un rol restringido llamado app_user.SQL-- Configuración de seguridad aplicada automáticamente
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM app_user;
GRANT SELECT ON ALL VIEWS TO app_user;
📑 Anexo: Estructura de Base de DatosEvidencia de las vistas SQL registradas (salida de \dv):Plaintexttorneo_db=# \dv
              List of relations
 Schema |             Name             | Type |  Owner
--------+------------------------------+------+----------
 public | vw_games_popularity_ranking  | view | postgres
 public | vw_lowest_performer_per_game | view | postgres
 public | vw_lowest_performer_per_team | view | postgres
 public | vw_player_global_ranking     | view | postgres
 public | vw_top_teams                 | view | postgres
(5 rows)

Se utilizó asistencia de IA para optimizar los siguientes componentes:

Diseño UI: Estilos con Tailwind CSS para una estética "Gamer Dark".

SQL: Optimización de funciones de ventana en las vistas de ranking.

Docker: Configuración de healthchecks para la sincronización de servicios.