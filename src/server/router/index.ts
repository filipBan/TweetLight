// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { authRouter } from './authRouter'
import { tweetRouter } from './tweetRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('tweet.', tweetRouter)

// export type definition of API
export type AppRouter = typeof appRouter
