import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const message = await prisma.contactMessage.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                subject: data.subject,
                message: data.message,
            },
        });

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error("Failed to save contact message:", error);
        return NextResponse.json(
            { error: "Failed to save message" },
            { status: 500 }
        );
    }
}
