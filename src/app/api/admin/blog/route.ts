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
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        const metaTitle = formData.get("metaTitle") as string;
        const metaDescription = formData.get("metaDescription") as string;

        // Check if slug already exists
        const existing = await prisma.post.findUnique({
            where: { slug },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Bu slug zaten kullanımda" },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                metaTitle: metaTitle || title,
                metaDesc: metaDescription || excerpt,
                published: true,
                authorId: session.user.id,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Failed to create blog post:", error);
        return NextResponse.json(
            { error: "Failed to create blog post" },
            { status: 500 }
        );
    }
}
