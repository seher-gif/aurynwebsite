import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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
                console.log('Authorize called with:', { email: credentials?.email });
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(4) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    console.log('Credentials parsed successfully for:', email);

                    const user = await getUser(email);
                    if (!user) {
                        console.log('User not found in database.');
                        return null;
                    }
                    console.log('User found:', { id: user.id, email: user.email, role: user.role });

                    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
                    console.log('Password match result:', passwordsMatch);

                    if (passwordsMatch) return user;
                } else {
                    console.log('Credential validation failed:', parsedCredentials.error);
                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
