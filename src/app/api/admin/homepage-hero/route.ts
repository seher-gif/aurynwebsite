import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const heroSchema = z.object({
    headline: z.string().min(1, "Başlık zorunludur"),
    subheadline: z.string().optional(),
    ctaPrimaryLabel: z.string().optional(),
    ctaPrimaryUrl: z.string().optional(),
    ctaSecondaryLabel: z.string().optional(),
    ctaSecondaryUrl: z.string().optional(),
    badgeText: z.string().optional(),
    backgroundStyle: z.string().optional(),
});

export async function GET() {
    try {
        const hero = await prisma.homepageHero.findFirst();
        return NextResponse.json(hero || {});
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = heroSchema.parse(body);

        // Check if a hero record exists
        const existingHero = await prisma.homepageHero.findFirst();

        let hero;
        if (existingHero) {
            hero = await prisma.homepageHero.update({
                where: { id: existingHero.id },
                data: validatedData,
            });
        } else {
            hero = await prisma.homepageHero.create({
                data: validatedData,
            });
        }

        return NextResponse.json(hero);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update hero data" }, { status: 500 });
    }
}
