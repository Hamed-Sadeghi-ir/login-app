import { prisma } from "@/prisma/client";
import { Member } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const member = (await prisma.member.findFirst({
          where: {
            Username: credentials.username,
          },
        })) as Member;

        if (!member) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          member.Password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: member.MemberID.toString(),
          username: member.Username,
          firstName: member.FirstName || "",
          lastName: member.LastName || "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
        };
      }
      return session;
    },
  },
};

export default authOptions;
