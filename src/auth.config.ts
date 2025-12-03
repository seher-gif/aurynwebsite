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
            
            // Check if the URL belongs to the same origin as baseUrl
            try {
                const urlObj = new URL(url);
                const baseUrlObj = new URL(baseUrl);
                if (urlObj.origin === baseUrlObj.origin) {
                    return url;
                }
            } catch (e) {
                // Invalid URL, fall back to baseUrl
                console.error('[NextAuth Redirect Error]', e);
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
                return false; // Will redirect to specified page
            }
            
            // If on admin page, require authentication
            if (isOnAdmin) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            
            return true;
        },
    },
} satisfies NextAuthConfig;
