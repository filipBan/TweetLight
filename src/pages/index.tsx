import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { signIn, signOut, useSession } from 'next-auth/react'
import { unstable_getServerSession } from 'next-auth'
import { authOptions as NextAuthOptions } from './api/auth/[...nextauth]'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   const session = await unstable_getServerSession(
//     ctx.req,
//     ctx.res,
//     NextAuthOptions
//   )

//   if (!session) {
//     return {
//       redirect: { destination: '/login', permanent: false },
//     }
//   }

//   console.log('Sesssion:', session)

//   return {
//     props: {
//       session,
//     },
//   }
// }

export default Home
