import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

// Middleware to handle parameter spam and auth
export default auth((req) => {
    const { nextUrl } = req;

    // 1. Parameter Spam Protection (Stage 3)
    // Check if the URL contains the spam parameter "_g"
    if (nextUrl.searchParams.has('_g')) {
        // Clone the URL to modify it
        const cleanUrl = nextUrl.clone();

        // Remove the spam parameter
        cleanUrl.searchParams.delete('_g');

        // Redirect to the clean URL (301 Permanent Redirect)
        // This tells Google to de-index the spam URL and index the clean one
        return Response.redirect(cleanUrl, 301);
    }

    // Middleware runs before route handlers
    // NextAuth will handle auth checks in the authorized callback
});

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|login|.*\\.png$).*)'],
};
