import { inferQueryOutput } from '@/utils/trpc'
import { useLikeTweet } from '@/utils/useLikeTweet'
import { useOnClickOutside } from '@/utils/useOnClickOutside'
import { useUnlikeTweet } from '@/utils/useUnlikeTweet'
import { useSession } from 'next-auth/react'
import { FC, useRef, useState } from 'react'
import { LikeButton } from './LikeButton'
import { NewTweet } from './NewTweet'

export const Tweet: FC<{
  tweet: inferQueryOutput<'tweet.getMyTweets'>[number]
}> = ({ tweet }) => {
  const [showReplyBox, setShowReplyBox] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    if (showReplyBox) {
      setShowReplyBox(false)
    }
  })

  const { data: session } = useSession()
  const { mutate: likeTweet } = useLikeTweet()
  const { mutate: unlikeTweet } = useUnlikeTweet()

  const isLiked = Boolean(
    tweet.likes.find((like) => like.userId === session?.user?.id)
  )

  return (
    <div
      ref={ref}
      className="flex flex-col border p-4 items-start hover:bg-slate-800 cursor-pointer"
    >
      <div className="mb-2">
        {tweet.author.name} {tweet.createdAt.toLocaleDateString()}{' '}
        {tweet.createdAt.toLocaleTimeString()}
      </div>
      <div className="mb-2">{tweet.content}</div>
      <div className="flex items-center gap-2">
        {tweet._count.replies > 0 && <span>{tweet._count.replies}</span>}

        <button onClick={() => setShowReplyBox((v) => !v)}>Reply</button>
        {tweet.likes.length > 0 && <span>{tweet.likes.length}</span>}
        <LikeButton
          isLiked={isLiked}
          onClick={() => {
            isLiked
              ? unlikeTweet({ tweetId: tweet.id })
              : likeTweet({ tweetId: tweet.id })
          }}
        />
      </div>
      {showReplyBox && (
        <div className="w-full mt-4">
          <NewTweet replyParentId={tweet.id} />
        </div>
      )}
    </div>
  )
}
