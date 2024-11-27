# Base
FROM node:22-alpine AS build
#FROM node:22-slim

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -f && npm cache clean --force

COPY . .

RUN npm run build

FROM node:22-alpine
WORKDIR /usr/app

COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/package*.json ./

#RUN npm ci --production --legacy-peer-deps && npm cache clean --force
RUN npm install -f --omit=dev && npm cache clean --force
EXPOSE 4000


CMD ["npm", "run", "start:prod", "prisma:generate-migrate"]
