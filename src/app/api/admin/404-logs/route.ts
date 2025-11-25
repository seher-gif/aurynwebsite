import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const logs = await prisma.notFoundLog.findMany({
            orderBy: { lastHitAt: 'desc' },
            take: 100, // Limit to last 100 logs
        });
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}
