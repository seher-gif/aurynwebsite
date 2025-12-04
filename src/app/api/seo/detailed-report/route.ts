import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeSEO } from "@/lib/ai/gemini";
import { sendSEOReport } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
    try {
        const { domain, email } = await request.json();

        if (!domain || !email) {
            return NextResponse.json(
                { error: "Domain and email are required" },
                { status: 400 }
            );
        }

        // Get detailed AI-powered SEO analysis
        const analysis = await analyzeSEO({ domain, email });

        // Save to database
        await prisma.seoAnalysis.create({
            data: {
                domain,
                email,
                score: analysis.score,
                results: analysis,
            },
        });

        // Send email with detailed report
        const emailResult = await sendSEOReport({
            to: email,
            domain,
            analysis,
        });

        if (!emailResult.success) {
            console.error('Failed to send email:', emailResult.error);
            // Save contact anyway for manual follow-up
            await prisma.contactMessage.create({
                data: {
                    name: "SEO Analiz Talebi",
                    email,
                    subject: `SEO Analiz - ${domain}`,
                    message: `Detaylı SEO analiz raporu talep edildi. Domain: ${domain}, Puan: ${analysis.score}. Email gönderimi başarısız oldu, manuel takip gerekiyor.`,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Detailed report failed:", error);
        return NextResponse.json(
            { error: "Failed to generate report" },
            { status: 500 }
        );
    }
}
