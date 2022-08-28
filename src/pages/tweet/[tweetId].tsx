import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Page } from '@/components/Page'
import { Tweet } from '@/components/Tweet'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import React from 'react'

const TweetReplies = () => {
  const router = useRouter()

  const { data, isLoading } = trpc.useQuery([
    'tweet.getTweetAndReplies',
    { tweetId: router.query.tweetId as string | undefined },
  ])

  return (
    <Page>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-4 w-full">
            <Tweet key={data?.id} tweet={data} />
          </div>
          {data?.replies.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </>
      )}
    </Page>
  )
}

export default TweetReplies
