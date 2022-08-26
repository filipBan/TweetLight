import { createProtectedRouter } from './protected-router'

export const authRouter = createProtectedRouter()
  .query('getSession', {
    resolve({ ctx }) {
      return ctx.session
    },
  })
  .query('getSecretMessage', {
    resolve({ ctx }) {
      return 'He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.'
    },
  })
