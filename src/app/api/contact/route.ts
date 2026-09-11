import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email/resend";

const contactSchema = z.object({
    name: z.string().trim().min(2).max(200),
    email: z.string().trim().email().max(320),
    phone: z.string().trim().max(50).optional().or(z.literal("")),
    company: z.string().trim().max(200).optional().or(z.literal("")),
    subject: z.string().trim().max(200).optional().or(z.literal("")),
    message: z.string().trim().min(10).max(5000),
    // Honeypot: dolu gelirse istek bir bot tarafından gönderilmiştir.
    website: z.string().max(0).optional().or(z.literal("")),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.set(key, { count: 1, windowStart: now });
        return false;
    }

    entry.count += 1;
    return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin." },
            { status: 429 }
        );
    }

    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: "Geçersiz istek gövdesi" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Form verileri geçersiz.", issues: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const { name, email, phone, company, subject, message, website } = parsed.data;

    // Honeypot dolu geldiyse sessizce başarı döndür, işlemi yapma.
    if (website) {
        return NextResponse.json({ success: true });
    }

    let dbSaveFailed = false;
    try {
        await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone: phone || null,
                company: company || null,
                subject: subject || null,
                message,
            },
        });
    } catch (error) {
        dbSaveFailed = true;
        console.error("Failed to save contact message:", error);
    }

    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
    if (process.env.RESEND_API_KEY && notificationEmail) {
        try {
            await sendContactNotification({
                to: notificationEmail,
                name,
                email,
                phone,
                company,
                subject,
                message,
            });
        } catch (emailError) {
            console.error("Failed to send contact email notification:", emailError);
        }
    }

    if (dbSaveFailed && !(process.env.RESEND_API_KEY && notificationEmail)) {
        return NextResponse.json(
            { error: "Mesajınız kaydedilemedi. Lütfen tekrar deneyin." },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}
