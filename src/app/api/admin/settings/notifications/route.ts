import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getNotificationSettings, NOTIFICATION_KEYS } from "@/lib/settings";
import { sendTestNotification } from "@/lib/email/resend";

const updateSchema = z.object({
    contactEnabled: z.boolean(),
    contactEmail: z.string().trim().email("Geçerli bir e-posta adresi giriniz").max(320).or(z.literal("")),
});

async function requireAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") return null;
    return session;
}

export async function GET() {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const settings = await getNotificationSettings();
    return NextResponse.json({
        ...settings,
        emailConfigured: Boolean(process.env.RESEND_API_KEY),
    });
}

export async function PUT(request: NextRequest) {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = updateSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message || "Geçersiz veri" }, { status: 400 });
    }
    const { contactEnabled, contactEmail } = parsed.data;
    if (contactEnabled && !contactEmail && !process.env.CONTACT_NOTIFICATION_EMAIL) {
        return NextResponse.json({ error: "Bildirimleri açmak için bir e-posta adresi girin." }, { status: 400 });
    }

    await Promise.all([
        prisma.siteSetting.upsert({
            where: { key: NOTIFICATION_KEYS.contactEnabled },
            update: { value: String(contactEnabled) },
            create: { key: NOTIFICATION_KEYS.contactEnabled, value: String(contactEnabled) },
        }),
        prisma.siteSetting.upsert({
            where: { key: NOTIFICATION_KEYS.contactEmail },
            update: { value: contactEmail },
            create: { key: NOTIFICATION_KEYS.contactEmail, value: contactEmail },
        }),
    ]);
    return NextResponse.json({ success: true });
}

// POST - kayıtlı alıcıya test e-postası gönder
export async function POST() {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json({ error: "E-posta servisi (Resend) yapılandırılmamış." }, { status: 503 });
    }
    const { contactEmail } = await getNotificationSettings();
    if (!contactEmail) {
        return NextResponse.json({ error: "Önce bir alıcı e-posta adresi kaydedin." }, { status: 400 });
    }
    try {
        const result = await sendTestNotification(contactEmail);
        if (result.error) {
            console.error("Test notification failed:", result.error);
            return NextResponse.json({ error: "Test e-postası gönderilemedi." }, { status: 502 });
        }
        return NextResponse.json({ success: true, to: contactEmail });
    } catch (error) {
        console.error("Test notification error:", error);
        return NextResponse.json({ error: "Test e-postası gönderilemedi." }, { status: 502 });
    }
}
