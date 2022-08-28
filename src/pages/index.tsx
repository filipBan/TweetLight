/* eslint-disable @next/next/no-img-element */
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import { useSession } from 'next-auth/react'

import { getTweetLightSession } from '@/utils/getTweetLightSession'
import { NewTweet } from '@/components/NewTweet'
import ListOfTweets from '@/components/ListOfTweets'
import { Page } from '@/components/Page'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (!session || !session.user) {
    return null
  }

  return (
    <Page>
      <NewTweet />
      <ListOfTweets />
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getTweetLightSession(ctx)

  if (!session) {
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default Home
