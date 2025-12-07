import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - Fetch single blog post
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!post) {
            return NextResponse.json(
                { error: "Blog yazısı bulunamadı" },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Failed to fetch blog post:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog post" },
            { status: 500 }
        );
    }
}

// PUT - Update blog post
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
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
        const coverImage = formData.get("coverImage") as string;
        const category = formData.get("category") as string;
        const metaTitle = formData.get("metaTitle") as string;
        const metaDesc = formData.get("metaDesc") as string;
        const published = formData.get("published") === "on";

        // Check if slug already exists (excluding current post)
        const existing = await prisma.post.findFirst({
            where: {
                slug,
                id: { not: id },
            },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Bu slug başka bir yazıda kullanılıyor" },
                { status: 400 }
            );
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt: excerpt || null,
                content: content || null,
                coverImage: coverImage || null,
                category: category || null,
                metaTitle: metaTitle || title,
                metaDesc: metaDesc || excerpt,
                published,
            },
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("Failed to update blog post:", error);
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 }
        );
    }
}

// DELETE - Delete blog post
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.post.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete blog post:", error);
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 }
        );
    }
}
