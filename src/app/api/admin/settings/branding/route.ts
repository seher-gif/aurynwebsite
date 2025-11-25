import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();

        const settings = {
            logoUrl: formData.get("logoUrl") as string,
            faviconUrl: formData.get("faviconUrl") as string,
            heroHeadline: formData.get("heroHeadline") as string,
            heroSubheadline: formData.get("heroSubheadline") as string,
            heroPrimaryLabel: formData.get("heroPrimaryLabel") as string,
            heroPrimaryUrl: formData.get("heroPrimaryUrl") as string,
            heroSecondaryLabel: formData.get("heroSecondaryLabel") as string,
            heroSecondaryUrl: formData.get("heroSecondaryUrl") as string,
            heroBadge: formData.get("heroBadge") as string,
        };

        // Update or create homepage hero settings
        const existingHero = await prisma.homepageHero.findFirst();

        if (existingHero) {
            await prisma.homepageHero.update({
                where: { id: existingHero.id },
                data: {
                    headline: settings.heroHeadline || existingHero.headline,
                    subheadline: settings.heroSubheadline || existingHero.subheadline,
                    ctaPrimaryLabel: settings.heroPrimaryLabel || existingHero.ctaPrimaryLabel,
                    ctaPrimaryUrl: settings.heroPrimaryUrl || existingHero.ctaPrimaryUrl,
                    ctaSecondaryLabel: settings.heroSecondaryLabel || existingHero.ctaSecondaryLabel,
                    ctaSecondaryUrl: settings.heroSecondaryUrl || existingHero.ctaSecondaryUrl,
                    badgeText: settings.heroBadge || existingHero.badgeText,
                },
            });
        } else {
            await prisma.homepageHero.create({
                data: {
                    headline: settings.heroHeadline || "Dijital Dünyada Markanızı Zirveye Taşıyın",
                    subheadline: settings.heroSubheadline || "",
                    ctaPrimaryLabel: settings.heroPrimaryLabel || "Hemen Başlayın",
                    ctaPrimaryUrl: settings.heroPrimaryUrl || "/iletisim",
                    ctaSecondaryLabel: settings.heroSecondaryLabel || "Hizmetlerimiz",
                    ctaSecondaryUrl: settings.heroSecondaryUrl || "/hizmetler",
                    badgeText: settings.heroBadge,
                },
            });
        }

        // In a real app, logo and favicon would be stored in database or file system
        // For now, they can be managed through environment variables or a settings table

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save branding settings:", error);
        return NextResponse.json(
            { error: "Failed to save settings" },
            { status: 500 }
        );
    }
}
