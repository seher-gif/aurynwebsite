'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export async function authenticate(
    prevState: string | null | undefined,
    formData: FormData,
): Promise<string | null | undefined> {
    try {
        const result = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });

        if (result?.error) {
            return 'Invalid credentials.';
        }

        // Manual redirect after successful login
        return null;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function updateUserPassword(
    prevState: string | null | undefined,
    formData: FormData,
): Promise<string | null | undefined> {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // Validation
        if (!email || !password || !confirmPassword) {
            return 'Tüm alanları doldurmanız gerekiyor.';
        }

        if (password !== confirmPassword) {
            return 'Şifreler eşleşmiyor.';
        }

        if (password.length < 8) {
            return 'Şifre en az 8 karakter olmalıdır.';
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user in database
        const user = await prisma.user.update({
            where: { email },
            data: {
                passwordHash: hashedPassword,
            },
        });

        if (!user) {
            return 'Kullanıcı bulunamadı.';
        }

        return null; // Success
    } catch (error) {
        console.error('Password update error:', error);
        return 'Şifre güncellenirken hata oluştu.';
    }
}
