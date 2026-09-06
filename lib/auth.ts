import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

declare module "next-auth" 
{
  interface Session extends DefaultSession 
  {
    user?: 
    {
      id?: string;
      role?: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User 
  {
    id: string;
    email: string;
    name: string | null;
    role: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" 
{
  interface JWT 
  {
    id?: string;
    role?: string;
    image?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: 
  [
    CredentialsProvider(
    {
      name: "Credentials",

      credentials: 
      {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) 
      {
        if (!credentials?.email || !credentials?.password) 
        {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique(
        {
          where: { email: credentials.email },
        });

        if (!user) 
        {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password || ""
        );

        if (!isPasswordValid) 
        {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  pages: 
  {
    signIn: "/en/auth/signin",
  },
  session: 
  {
    strategy: "jwt",
  },
  callbacks: 
  {
    async jwt({ token, user }: { token: JWT; user?: any }) 
    {
      if (user) 
      {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) 
    {
      if (session.user) 
      {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};