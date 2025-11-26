import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const email = 'seher@auryndijital.com';
        const password = '1234';
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: {
                passwordHash: hashedPassword, // Update password if user exists
                role: 'ADMIN',
            },
            create: {
                email,
                name: 'Admin User',
                passwordHash: hashedPassword,
                role: 'ADMIN',
            },
        });

        return NextResponse.json({ success: true, message: 'Admin user seeded successfully', user: { email: user.email, role: user.role } });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ success: false, error: 'Failed to seed database' }, { status: 500 });
    }
}
