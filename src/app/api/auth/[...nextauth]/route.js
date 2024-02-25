import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

const authOption = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            async profile(profile) {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: profile.email,
                    },
                    include: {
                        accounts: true,
                    },
                });

                const userProfile = {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };

                if (existingUser?.accounts.length === 0) {
                    userProfile.password = existingUser.password;
                    userProfile.name = existingUser.name;

                    await prisma.user.delete({
                        where: {
                            id: existingUser.id,
                        },
                    });
                }

                return userProfile;
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) return null;

                const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordMatched) return null;

                delete user.password;
                return user;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if ("email" in token) {
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.image;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
