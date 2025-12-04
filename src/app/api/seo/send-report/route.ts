import { NextRequest, NextResponse } from "next/server";
import { sendSEOReportEmail } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
    try {
        const { email, url, analysisData } = await request.json();

        if (!email || !url || !analysisData) {
            return NextResponse.json(
                { error: "Email, URL ve analiz verileri gerekli" },
                { status: 400 }
            );
        }

        // Email gönder
        await sendSEOReportEmail(email, url, analysisData);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Email gönderme hatası:", error);
        return NextResponse.json(
            { error: error.message || "Email gönderilemedi" },
            { status: 500 }
        );
    }
}
