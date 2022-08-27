import { useSession } from 'next-auth/react'
import { trpc } from './trpc'

export const useUnlikeTweet = () => {
  const utils = trpc.useContext()
  const { data: session } = useSession()

  return trpc.useMutation('tweet.unlikeTweet', {
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
}
