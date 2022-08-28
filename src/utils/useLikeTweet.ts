import { useSession } from 'next-auth/react'
import { trpc } from './trpc'

export const useLikeTweet = () => {
  const utils = trpc.useContext()
  const { data: session } = useSession()

  return trpc.useMutation('tweet.likeTweet', {
    onSuccess(likedTweet) {
      const oldData = utils.getQueryData(['tweet.getMyTweets'])
      if (oldData) {
        const newData = oldData.map((item) => {
          if (item.id === likedTweet.tweetId && session?.user?.id) {
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
}
