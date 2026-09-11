import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET all contact messages
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let messages: any[] = [];
        try {
            messages = await prisma.contactMessage.findMany({
                orderBy: { createdAt: "desc" },
            });
        } catch (error) {
            console.error("Failed to fetch messages (likely DB limit):", error);
        }

        return NextResponse.json({ messages });
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}

// DELETE a message
export async function DELETE(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Message ID required" }, { status: 400 });
        }

        await prisma.contactMessage.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete message:", error);
        return NextResponse.json(
            { error: "Failed to delete message" },
            { status: 500 }
        );
    }
}

// PATCH to update message status
export async function PATCH(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "ID and status required" }, { status: 400 });
        }

        const message = await prisma.contactMessage.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error("Failed to update message:", error);
        return NextResponse.json(
            { error: "Failed to update message" },
            { status: 500 }
        );
    }
}
