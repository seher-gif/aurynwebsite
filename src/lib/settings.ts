import { prisma } from "@/lib/prisma";

export const NOTIFICATION_KEYS = {
    contactEnabled: "notifyContactEnabled",
    contactEmail: "notifyContactEmail",
} as const;

export interface NotificationSettings {
    contactEnabled: boolean;
    contactEmail: string;
}

/**
 * Bildirim ayarları: yönetici panelinde kaydedilen değer varsa o, yoksa
 * ortam değişkeni (CONTACT_NOTIFICATION_EMAIL) kullanılır.
 */
export async function getNotificationSettings(): Promise<NotificationSettings> {
    const fallbackEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "";
    try {
        const rows = await prisma.siteSetting.findMany({
            where: { key: { in: Object.values(NOTIFICATION_KEYS) } },
        });
        const enabled = rows.find((r) => r.key === NOTIFICATION_KEYS.contactEnabled)?.value;
        const email = rows.find((r) => r.key === NOTIFICATION_KEYS.contactEmail)?.value;
        return {
            contactEnabled: enabled === undefined ? true : enabled === "true",
            contactEmail: email || fallbackEmail,
        };
    } catch (error) {
        console.error("Failed to load notification settings:", error);
        return { contactEnabled: true, contactEmail: fallbackEmail };
    }
}
