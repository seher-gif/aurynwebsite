import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const pageSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur"),
    slug: z.string().min(1, "Slug zorunludur").regex(/^[a-z0-9-]+$/, "Slug sadece küçük harf, rakam ve tire içerebilir"),
    content: z.any().optional(),
    metaTitle: z.string().optional(),
    metaDesc: z.string().optional(),
    canonical: z.string().optional(),
    index: z.boolean().optional(),
    follow: z.boolean().optional(),
    ogTitle: z.string().optional(),
    ogDesc: z.string().optional(),
    ogImage: z.string().optional(),
    published: z.boolean().optional(),
});

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const pages = await prisma.page.findMany({
            orderBy: { updatedAt: 'desc' },
        });
        return NextResponse.json(pages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = pageSchema.parse(body);

        const existingPage = await prisma.page.findUnique({
            where: { slug: validatedData.slug },
        });

        if (existingPage) {
            return NextResponse.json({ error: "Bu slug zaten kullanımda" }, { status: 400 });
        }

        const page = await prisma.page.create({
            data: validatedData,
        });

        return NextResponse.json(page);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
    }
}
