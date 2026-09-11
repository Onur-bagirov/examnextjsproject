import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
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
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) 
    {
      if (user) 
      {
        token.id = user.id;
        token.role = user.role || "user";
        token.image = user.image;
      }
      
      if (account?.provider === "google" && user) 
      {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser && user.email) 
        {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              password: "",
              role: "user",
            },
          });
          token.id = newUser.id;
          token.role = newUser.role;
          token.image = newUser.image;
        }
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