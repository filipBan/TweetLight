// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { protectedRouter } from './protected-router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', protectedRouter)

// export type definition of API
export type AppRouter = typeof appRouter
