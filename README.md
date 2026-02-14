## 🔒 Configuración y Seguridad (Threat Model)

Para evitar la exposición de credenciales (SQL Injection y fugas de contraseñas), este proyecto sigue un modelo de seguridad estricto:
1. **Sin credenciales hardcodeadas:** Ningún archivo del repositorio contiene contraseñas reales.
2. **Uso de `.env`:** Las credenciales se inyectan mediante el archivo `.env` (provisto de forma privada).
3. **Principio de Mínimo Privilegio:** La aplicación Next.js no usa el usuario `postgres`. Se conecta mediante un rol dedicado (`{APP_DB_USER}`) que tiene explícitamente denegado el acceso a las tablas base y solo puede hacer `SELECT` sobre las Vistas.

### 🚀 Instrucciones de Ejecución
1. Coloca el archivo `.env` (enviado por privado) en la raíz del proyecto.
2. Abre el archivo `db/roles.sql` y reemplaza `{APP_DB_USER}` y `{APP_DB_PASSWORD}` por las credenciales de la App estipuladas en el `.env`.
3. Ejecuta el comando: `docker compose up --build`