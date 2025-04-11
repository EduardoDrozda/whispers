# Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g nx
RUN npm install

RUN npm run api:build

# Production
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/apps/whispers.api/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/apps/whispers.api/prisma ./prisma

RUN npx prisma generate

RUN npm install --only=production

ENV PORT=3333

CMD ["node", "dist/main.js"]
