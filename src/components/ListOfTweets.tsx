import { trpc } from '@/utils/trpc'
import { useLikeTweet } from '@/utils/useLikeTweet'
import { useUnlikeTweet } from '@/utils/useUnlikeTweet'
import { useSession } from 'next-auth/react'
import { LikeButton } from './LikeButton'
import { LoadingSpinner } from './LoadingSpinner'

const ListOfTweets = () => {
  const { data: session } = useSession()

  const { data, isLoading } = trpc.useQuery(['tweet.getMyTweets'])
  const { mutate: likeTweet } = useLikeTweet()
  const { mutate: unlikeTweet } = useUnlikeTweet()

  return (
    <div className="flex flex-col justify-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data?.map((tweet) => {
          const isLiked = Boolean(
            tweet.likes.find((like) => like.userId === session?.user?.id)
          )

          return (
            <div
              key={tweet.id}
              className="flex flex-col border p-4 items-start"
            >
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
        })
      )}
    </div>
  )
}

export default ListOfTweets
