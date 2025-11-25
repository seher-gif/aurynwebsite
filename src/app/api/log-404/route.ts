import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { path, referrer } = body;

        if (!path) {
            return NextResponse.json({ error: "Path is required" }, { status: 400 });
        }

        // Check if a log already exists for this path
        const existingLog = await prisma.notFoundLog.findFirst({
            where: { path },
        });

        if (existingLog) {
            await prisma.notFoundLog.update({
                where: { id: existingLog.id },
                data: {
                    count: { increment: 1 },
                    lastHitAt: new Date(),
                    referrer: referrer || existingLog.referrer,
                },
            });
        } else {
            await prisma.notFoundLog.create({
                data: {
                    path,
                    referrer,
                    count: 1,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to log 404" }, { status: 500 });
    }
}
