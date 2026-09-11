import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendSEOReport } from "@/lib/email/resend";

const metricSchema = z.object({
    label: z.string(),
    status: z.enum(["success", "warning", "error"]),
    message: z.string(),
});

const analysisSchema = z.object({
    score: z.number(),
    metrics: z.array(metricSchema),
}).passthrough();

const bodySchema = z.object({
    domain: z.string().min(1),
    email: z.string().email(),
    analysis: analysisSchema,
});

export async function POST(request: NextRequest) {
    try {
        const payload = bodySchema.safeParse(await request.json());

        if (!payload.success) {
            return NextResponse.json(
                { error: "Domain, email ve analiz verisi gerekli" },
                { status: 400 }
            );
        }

        const { domain, email, analysis } = payload.data;

        // Save to database
        await prisma.seoAnalysis.create({
            data: {
                domain,
                email,
                score: analysis.score,
                results: analysis,
            },
        });

        // Send email with the report the user already saw on the site -
        // never re-run a separate analysis pipeline for this.
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

            return NextResponse.json(
                { success: false, error: "Rapor e-postası gönderilemedi. Lütfen daha sonra tekrar deneyin." },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Detailed report failed:", error);
        return NextResponse.json(
            { error: "Rapor oluşturulamadı" },
            { status: 500 }
        );
    }
}
