# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiamos archivos de configuración de dependencias
COPY package*.json ./

# Instalamos las librerías necesarias
RUN npm install

# Copiamos el resto del código (App Router, src, etc.)
COPY . .

# Exponemos el puerto estándar de Next.js
EXPOSE 3000

# Iniciamos en modo desarrollo para que veas tus cambios
CMD ["npm", "run", "dev"]