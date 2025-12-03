import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [
        // Added later in auth.ts
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Ensure baseUrl is always set correctly
            console.log('[NextAuth Redirect]', { url, baseUrl });
            
            // If url is a relative path, always prepend baseUrl
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            
            // If no URL provided, return baseUrl
            if (!url) {
                return baseUrl;
            }
            
            // Check if the URL belongs to the same origin as baseUrl
            try {
                const urlObj = new URL(url);
                const baseUrlObj = new URL(baseUrl);
                
                // Allow redirects to same origin (works with auryndijital.com, vercel.app, etc)
                if (urlObj.origin === baseUrlObj.origin) {
                    return url;
                }
                
                // Allow redirects to localhost for development
                if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
                    return url;
                }
            } catch (e) {
                // Invalid URL, fall back to baseUrl
                console.error('[NextAuth Redirect Error]', e);
                return baseUrl;
            }
            
            // Default to baseUrl if no valid redirect found
            return baseUrl;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnLogin = nextUrl.pathname.startsWith('/login');
            
            // If on login page and already logged in, redirect to admin
            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL('/admin', nextUrl.origin));
            }
            
            // If on admin page, require authentication
            if (isOnAdmin) {
                // User is authenticated, allow access
                if (isLoggedIn) {
                    return true;
                }
                
                // User is not authenticated, redirect to login with callbackUrl
                const loginUrl = new URL('/login', nextUrl.origin);
                loginUrl.searchParams.set('callbackUrl', nextUrl.href);
                return Response.redirect(loginUrl);
            }
            
            // Allow access to all other pages
            return true;
        },
    },
} satisfies NextAuthConfig;
