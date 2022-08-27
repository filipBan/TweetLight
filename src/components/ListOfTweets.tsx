import { trpc } from '@/utils/trpc'
import { LoadingSpinner } from './LoadingSpinner'

const ListOfTweets = () => {
  const { data, isLoading } = trpc.useQuery(['tweet.getMyTweets'])

  return (
    <div className="flex flex-col justify-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data?.map((tweet) => (
          <div key={tweet.id} className="flex flex-col border p-4">
            <div>
              {tweet.author.name} {tweet.createdAt.toLocaleDateString()}{' '}
              {tweet.createdAt.toLocaleTimeString()}
            </div>
            <div>{tweet.content}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default ListOfTweets
