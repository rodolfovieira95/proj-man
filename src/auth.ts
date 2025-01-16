import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import GitHub from "next-auth/providers/github";
import Passkey from "next-auth/providers/passkey";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Resend, Passkey],
  experimental: { enableWebAuthn: true },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Inclui o `id` do usuário no token JWT
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Inclui o `id` do token na sessão
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
