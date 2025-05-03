import { auth } from '@/app/api/auth/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    if (nextUrl.pathname.startsWith('/mems/upload')) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|.*\\.(?:jpg|svg|png)$).*)'],
};