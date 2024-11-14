import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnUpload = nextUrl.pathname.startsWith('/mems/upload');
            if (isOnUpload) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/mems/upload', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;