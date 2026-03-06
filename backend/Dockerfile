FROM node:20-slim

WORKDIR /app

# Instalar dependencias necesarias para better-sqlite3 (compilación nativa)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
