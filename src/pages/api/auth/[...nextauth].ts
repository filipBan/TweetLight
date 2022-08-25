import NextAuth, { type NextAuthOptions } from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'
import { env } from '../../../env/server.mjs'

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session }) {
      return session
    },
  },
  secret: env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
