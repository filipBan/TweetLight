import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const tweetRouter = createProtectedRouter()
  .mutation('newTweet', {
    input: z.object({
      content: z.string(),
      replyParentId: z.optional(z.string()),
    }),
    async resolve({ ctx, input }) {
      const newTweet = await ctx.prisma.tweet.create({
        data: {
          userId: ctx.session.user.id,
          content: input.content,
          replyParentId: input.replyParentId ?? null,
        },
      })

      return { success: true, tweet: newTweet }
    },
  })
  .mutation('likeTweet', {
    input: z.object({
      tweetId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const likedTweet = await ctx.prisma.like.create({
        data: {
          tweetId: input.tweetId,
          userId: ctx.session.user.id,
        },
      })

      return { success: true, likedTweet }
    },
  })
  .mutation('unlikeTweet', {
    input: z.object({
      tweetId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const unlikedTweet = await ctx.prisma.like.delete({
        where: {
          tweetId_userId: {
            tweetId: input.tweetId,
            userId: ctx.session.user.id,
          },
        },
      })

      return { success: true, unlikedTweet }
    },
  })
  .query('getMyTweets', {
    async resolve({ ctx }) {
      const myTweets = await ctx.prisma.tweet.findMany({
        where: { userId: ctx.session.user.id, replyParentId: null },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          content: true,
          createdAt: true,
          likes: {
            select: {
              userId: true,
            },
          },
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              replies: true,
            },
          },
        },
      })

      return myTweets
    },
  })
