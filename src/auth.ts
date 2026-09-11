import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { isRateLimited, recordAttempt, clearAttempts } from '@/lib/security/rate-limit';

const LOGIN_RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 5, lockoutMs: 15 * 60 * 1000 };

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    trustHost: true,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(4) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null;
                }

                const { email, password } = parsedCredentials.data;
                const rateLimitKey = `login:${email.toLowerCase()}`;

                // Blunt brute-force/credential-stuffing against a known admin email.
                if (isRateLimited(rateLimitKey, LOGIN_RATE_LIMIT)) {
                    console.warn(`Login rate limit hit for ${email}`);
                    return null;
                }

                const user = await getUser(email);
                if (!user || !user.passwordHash) {
                    recordAttempt(rateLimitKey, LOGIN_RATE_LIMIT);
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
                if (!passwordsMatch) {
                    recordAttempt(rateLimitKey, LOGIN_RATE_LIMIT);
                    return null;
                }

                clearAttempts(rateLimitKey);
                return user;
            },
        }),
    ],
});
