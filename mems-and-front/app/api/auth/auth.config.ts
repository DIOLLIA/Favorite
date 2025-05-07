import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    providers:[],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnUpload = nextUrl.pathname.startsWith('/mems/upload');

            if (isOnUpload) {
                return isLoggedIn;
            }

            return true;
        },
        // async jwt({ token, user }) {
        //     if (user) {
        //         token.id = user.id;
        //     }
        //     return token;
        // },
        // async session({ session, token }) {
        //     if (session.user) {
        //         session.user.id = token.id as string;
        //     }
        //     return session;
        // }
    // },
    // session: {
    //     strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
};