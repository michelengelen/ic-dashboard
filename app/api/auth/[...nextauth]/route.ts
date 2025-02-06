import type { Session as NextAuthSession } from 'next-auth';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import type { JWT } from 'next-auth/jwt';

interface Session extends NextAuthSession {
  accessToken: JWT['accessToken'];
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: { scope: 'read:user repo' } // Request user & repo access
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session(params): Promise<Session> {
      return { ...params.session, accessToken: params.token.accessToken };
    }
  }
});

export { handler as GET, handler as POST };
