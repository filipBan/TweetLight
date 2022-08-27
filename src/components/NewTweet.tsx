import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import Image from 'next/image'

export const NewTweet = () => {
  const [value, setValue] = useState('')
  const { mutate, isLoading } = trpc.useMutation('tweet.newTweet')

  return (
    <div className="mb-4 flex flex-col items-end">
      <div className="border h-32 w-full mb-2">
        <textarea
          className="w-full h-full bg-inherit p-2 outline-none"
          placeholder="What's up?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border w-24 h-10 flex justify-center items-center">
        {isLoading ? (
          <Image src="/puff.svg" width={30} height={30} alt="Loading spinner" />
        ) : (
          <button
            onClick={() => mutate({ content: value })}
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
