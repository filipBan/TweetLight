import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { signOut, useSession } from 'next-auth/react'
import { unstable_getServerSession } from 'next-auth'
import { authOptions as NextAuthOptions } from './api/auth/[...nextauth]'

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
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    NextAuthOptions
  )

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
