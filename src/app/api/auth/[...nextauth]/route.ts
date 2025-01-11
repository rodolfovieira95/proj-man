// import NextAuth, { SessionStrategy } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email },
//         });

//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email e senha são obrigatórios");
//         }

//         if (
//           user &&
//           (await bcrypt.compare(credentials?.password, user.password))
//         ) {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
//   session: { strategy: "jwt" as SessionStrategy },
//   callbacks: {
//     async session({ session, token }) {
//       const user = session.user;
//       if (!user) return session;
//       user.id = token.id;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
