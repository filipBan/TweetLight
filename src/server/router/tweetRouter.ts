import { z } from 'zod'
import { createProtectedRouter } from './protected-router'
import { prisma } from '../db/client'

export const tweetRouter = createProtectedRouter().mutation('newTweet', {
  input: z.object({
    content: z.string(),
  }),
  async resolve({ ctx, input }) {
    const newTweet = await prisma.tweet.create({
      data: {
        userId: ctx.session.user.id,
        content: input.content,
      },
    })

    return { success: true, tweet: newTweet }
  },
})
