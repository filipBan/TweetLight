import { inferQueryOutput } from '@/utils/trpc'
import { useLikeTweet } from '@/utils/useLikeTweet'
import { useUnlikeTweet } from '@/utils/useUnlikeTweet'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import { LikeButton } from './LikeButton'

export const Tweet: FC<{
  tweet: inferQueryOutput<'tweet.getMyTweets'>[number]
}> = ({ tweet }) => {
  const { data: session } = useSession()
  const { mutate: likeTweet } = useLikeTweet()
  const { mutate: unlikeTweet } = useUnlikeTweet()

  const isLiked = Boolean(
    tweet.likes.find((like) => like.userId === session?.user?.id)
  )

  return (
    <div key={tweet.id} className="flex flex-col border p-4 items-start">
      <div>
        {tweet.author.name} {tweet.createdAt.toLocaleDateString()}{' '}
        {tweet.createdAt.toLocaleTimeString()}
      </div>
      <div>{tweet.content}</div>
      <LikeButton
        isLiked={isLiked}
        onClick={() => {
          isLiked
            ? unlikeTweet({ tweetId: tweet.id })
            : likeTweet({ tweetId: tweet.id })
        }}
      />
    </div>
  )
}
