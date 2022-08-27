import { trpc } from '@/utils/trpc'
import { useSession } from 'next-auth/react'
import { LikeButton } from './LikeButton'
import { LoadingSpinner } from './LoadingSpinner'

const ListOfTweets = () => {
  const { data: session } = useSession()
  const utils = trpc.useContext()

  const { data, isLoading } = trpc.useQuery(['tweet.getMyTweets'])

  const { mutate: likeTweet } = trpc.useMutation('tweet.likeTweet', {
    onSuccess(data) {
      const oldData = utils.getQueryData(['tweet.getMyTweets'])
      if (oldData) {
        const newData = oldData.map((item) => {
          if (item.id === data.likedTweet.tweetId && session?.user?.id) {
            return {
              ...item,
              likes: [...item.likes, { userId: session.user.id }],
            }
          }

          return item
        })

        utils.setQueryData(['tweet.getMyTweets'], newData)
      }
    },
  })

  const { mutate: unlikeTweet } = trpc.useMutation('tweet.unlikeTweet', {
    onSuccess(data) {
      const oldData = utils.getQueryData(['tweet.getMyTweets'])
      if (oldData) {
        const newData = oldData.map((item) => {
          if (item.id === data.unlikedTweet.tweetId) {
            return {
              ...item,
              likes: item.likes.filter(
                (like) => like.userId !== session?.user?.id
              ),
            }
          }
          return item
        })

        utils.setQueryData(['tweet.getMyTweets'], newData)
      }
    },
  })

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
