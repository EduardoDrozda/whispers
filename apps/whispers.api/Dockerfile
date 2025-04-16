# Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npx nx run whispers.api:generate-types

RUN npx nx run whispers.api:migrate

RUN npm run api:build

# Production
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist/apps/whispers.api ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/apps/whispers.api/prisma ./prisma

RUN npm install --only=production

ENV PORT=3333

CMD ["node", "dist/main.js"]
