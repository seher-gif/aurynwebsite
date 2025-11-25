import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const pageSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur"),
    slug: z.string().min(1, "Slug zorunludur"),
    content: z.any().optional(),
    metaTitle: z.string().optional(),
    metaDesc: z.string().optional(),
    published: z.boolean().optional(),
});

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const page = await prisma.page.findUnique({
            where: { id },
        });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error("Failed to fetch page:", error);
        return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const data = await request.json();
        const validatedData = pageSchema.parse(data);

        const page = await prisma.page.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(page);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        console.error("Failed to update page:", error);
        return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
    }
}

// PUT is an alias for PATCH
export const PUT = PATCH;

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await prisma.page.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete page:", error);
        return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
    }
}
