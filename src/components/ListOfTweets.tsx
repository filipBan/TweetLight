import { trpc } from '@/utils/trpc'
import { LoadingSpinner } from './LoadingSpinner'
import { Tweet } from './Tweet'

const ListOfTweets = () => {
  const { data, isLoading } = trpc.useQuery(['tweet.getMyTweets'])

  return (
    <div className="flex flex-col justify-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      )}
    </div>
  )
}

export default ListOfTweets
