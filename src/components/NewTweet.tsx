import { FC, useState } from 'react'
import { trpc } from '@/utils/trpc'
import { LoadingSpinner } from './LoadingSpinner'

export const NewTweet: FC<{
  replyParentId?: string
  onReplySubmitted?: () => void
}> = ({ replyParentId, onReplySubmitted }) => {
  const [value, setValue] = useState('')
  const utils = trpc.useContext()

  const { mutate, isLoading } = trpc.useMutation('tweet.newTweet', {
    onSuccess() {
      utils.invalidateQueries(['tweet.getMyTweets'])
      utils.invalidateQueries(['tweet.getTweetAndReplies'])

      setValue('')
      onReplySubmitted?.()
    },
  })

  return (
    <div className="mb-4 flex flex-col items-end w-full">
      <div className="border h-32 w-full mb-2">
        <textarea
          onClick={(e) => e.preventDefault()}
          className="w-full h-full bg-inherit p-2 outline-none resize-none"
          placeholder="What's up?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border w-24 h-10 flex justify-center items-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              mutate({ content: value, replyParentId })
            }}
            className="outline-none cursor-pointer h-10 w-24"
            disabled={isLoading}
          >
            Send
          </button>
        )}
      </div>
    </div>
  )
}
