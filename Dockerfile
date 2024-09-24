FROM node:22-alpine AS base

FROM base AS dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --verbose

FROM base AS develop

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

ENTRYPOINT ["npm", "run", "develop"]
