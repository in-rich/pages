# Rebuild the source code only when needed
FROM node:lts AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

# Production image, copy all the files and run next
FROM base

WORKDIR /app

COPY --from=build /app/public ./public

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ARG PORT=8080

EXPOSE $PORT

ENV PORT=$PORT

CMD ["node", "server.js"]
