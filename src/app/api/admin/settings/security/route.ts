import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isRateLimited, recordAttempt, clearAttempts } from "@/lib/security/rate-limit";

const PASSWORD_MIN_LENGTH = 10;
const LIMIT = { windowMs: 15 * 60 * 1000, max: 5, lockoutMs: 15 * 60 * 1000 };

const schema = z.object({
    currentPassword: z.string().min(1, "Mevcut şifrenizi girin."),
    newPassword: z
        .string()
        .min(PASSWORD_MIN_LENGTH, `Yeni şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır.`)
        .max(128, "Yeni şifre çok uzun.")
        .regex(/[A-Za-z]/, "Yeni şifre en az bir harf içermelidir.")
        .regex(/[0-9]/, "Yeni şifre en az bir rakam içermelidir."),
    confirmPassword: z.string(),
});

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const key = `pwchange:${session.user.id}`;
    if (isRateLimited(key, LIMIT)) {
        return NextResponse.json({ error: "Çok fazla deneme yapıldı. Lütfen 15 dakika sonra tekrar deneyin." }, { status: 429 });
    }

    const parsed = schema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message || "Geçersiz veri" }, { status: 400 });
    }
    const { currentPassword, newPassword, confirmPassword } = parsed.data;
    if (newPassword !== confirmPassword) {
        return NextResponse.json({ error: "Yeni şifreler eşleşmiyor." }, { status: 400 });
    }
    if (newPassword === currentPassword) {
        return NextResponse.json({ error: "Yeni şifre mevcut şifreyle aynı olamaz." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.passwordHash || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
        recordAttempt(key, LIMIT);
        return NextResponse.json({ error: "Mevcut şifre hatalı." }, { status: 400 });
    }

    await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: await bcrypt.hash(newPassword, 12) },
    });
    clearAttempts(key);
    return NextResponse.json({ success: true });
}
