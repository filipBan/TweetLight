import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { authOptions as NextAuthOptions } from './api/auth/[...nextauth]'

const Login: NextPage = () => {
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
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

  if (session) {
    return {
      redirect: { destination: '/', permanent: false },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default Login
