import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const profileSchema = z.object({
    name: z.string().min(1, "İsim zorunludur"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, "Yeni şifre en az 6 karakter olmalıdır").optional(),
    confirmPassword: z.string().optional(),
}).refine((data) => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Şifreler eşleşmiyor veya mevcut şifre girilmedi",
    path: ["confirmPassword"],
});

export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = profileSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updateData: any = {
            name: validatedData.name,
            email: validatedData.email,
        };

        if (validatedData.newPassword) {
            if (!user.passwordHash) {
                return NextResponse.json({ error: "Şifre oluşturulamadı: Mevcut şifre bulunamadı." }, { status: 400 });
            }
            const isPasswordValid = await bcrypt.compare(validatedData.currentPassword!, user.passwordHash);
            if (!isPasswordValid) {
                return NextResponse.json({ error: "Mevcut şifre yanlış" }, { status: 400 });
            }
            updateData.passwordHash = await bcrypt.hash(validatedData.newPassword, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: updateData,
        });

        return NextResponse.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
