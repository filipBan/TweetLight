import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const tweetRouter = createProtectedRouter()
  .mutation('newTweet', {
    input: z.object({
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      const newTweet = await ctx.prisma.tweet.create({
        data: {
          userId: ctx.session.user.id,
          content: input.content,
        },
      })

      return { success: true, tweet: newTweet }
    },
  })
  .query('getMyTweets', {
    async resolve({ ctx }) {
      const myTweets = await ctx.prisma.tweet.findMany({
        orderBy: { createdAt: 'desc' },
        where: { userId: ctx.session.user.id },
        include: { author: true },
      })

      return myTweets
    },
  })
