# ===== Stage 1: builder =====
FROM node:22-alpine AS builder

WORKDIR /app

# La URL de la API se inyecta en build time (Vite compila las VITE_* en el bundle)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Instalar dependencias (cache eficiente: primero los manifiestos)
COPY package*.json ./
RUN npm ci

# Copiar el código y buildear
COPY . .
RUN npm run build

# ===== Stage 2: producción =====
FROM nginx:alpine AS production

# Config de nginx para SPA (fallback a index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar solo los estáticos del builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]