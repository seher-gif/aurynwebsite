import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Şema aynı kalabilir, güncelleme için de bu kurallar geçerli
const pageSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur"),
    slug: z.string().min(1, "Slug zorunludur").regex(/^[a-z0-9-]+$/, "Slug sadece küçük harf, rakam ve tire içerebilir"),
    content: z.any().optional(), // Sayfa gövdesi burada
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

// YENİ EKLENEN GÜNCELLEME METODU
export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Güncelleme için ID'ye ihtiyacımız var, body'den ayırıyoruz
        const { id, ...dataToValidate } = body;

        if (!id) {
            return NextResponse.json({ error: "Sayfa ID'si gereklidir" }, { status: 400 });
        }

        // Veriyi doğruluyoruz
        const validatedData = pageSchema.parse(dataToValidate);

        // Slug kontrolü (Çok Önemli):
        // Eğer slug değiştiyse, yeni slug'ın BAŞKA bir sayfada kullanılıp kullanılmadığına bakmalıyız.
        // `NOT: { id: id }` kısmı, kendi kendisiyle çakışmasını engeller.
        const existingPage = await prisma.page.findFirst({
            where: {
                slug: validatedData.slug,
                NOT: {
                    id: id
                }
            },
        });

        if (existingPage) {
            return NextResponse.json({ error: "Bu slug başka bir sayfa tarafından kullanılıyor" }, { status: 400 });
        }

        // Güncelleme işlemi
        const updatedPage = await prisma.page.update({
            where: { id: id },
            data: validatedData,
        });

        return NextResponse.json(updatedPage);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
    }
}