import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'

export async function getTweetLightSession(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  return session
}
