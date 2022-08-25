import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { signOut, useSession } from 'next-auth/react'
import { getTweetLightSession } from '../utils/getTweetLightSession'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['auth.getSession'])

  const { data: session } = useSession()

  return (
    <>
      Signed in as {session?.user?.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
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
