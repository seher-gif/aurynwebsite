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
            
            // Prevent redirect loop: already logged in users should not be on /login
            if (isOnLogin && isLoggedIn) {
                // Don't redirect here - let the client handle it in the login page component
                // This prevents infinite redirect loops in middleware
                return true; // Allow access to /login even if logged in
            }
            
            // If on admin page, require authentication
            if (isOnAdmin) {
                if (isLoggedIn) return true;
                // Redirect to login with callbackUrl parameter
                return false; // Middleware will redirect to login
            }
            
            // Allow access to all other pages
            return true;
        },
    },
} satisfies NextAuthConfig;
