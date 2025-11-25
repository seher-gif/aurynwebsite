import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const redirectSchema = z.object({
    sourcePath: z.string().min(1, "Kaynak URL zorunludur").startsWith("/", "URL / ile başlamalıdır"),
    targetPath: z.string().min(1, "Hedef URL zorunludur").startsWith("/", "URL / ile başlamalıdır"),
    type: z.number().int().refine((val) => [301, 302].includes(val), "Geçersiz yönlendirme tipi"),
    active: z.boolean().optional(),
});

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const redirects = await prisma.redirect.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(redirects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch redirects" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = redirectSchema.parse(body);

        // Check for loops (basic check)
        if (validatedData.sourcePath === validatedData.targetPath) {
            return NextResponse.json({ error: "Kaynak ve hedef URL aynı olamaz" }, { status: 400 });
        }

        const existingRedirect = await prisma.redirect.findUnique({
            where: { sourcePath: validatedData.sourcePath },
        });

        if (existingRedirect) {
            return NextResponse.json({ error: "Bu kaynak URL için zaten bir yönlendirme var" }, { status: 400 });
        }

        const redirect = await prisma.redirect.create({
            data: validatedData,
        });

        return NextResponse.json(redirect);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create redirect" }, { status: 500 });
    }
}
