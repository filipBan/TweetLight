import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { getTweetLightSession } from '../utils/getTweetLightSession'

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
  const session = await getTweetLightSession(ctx)

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
