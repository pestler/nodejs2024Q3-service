# Base
FROM node:22-alpine As development
#FROM node:22-slim

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm install --legacy-peer-deps  --force && npm cache clean --force
RUN npx prisma generate

COPY . .
CMD ["npm", "run", "start:dev"]

