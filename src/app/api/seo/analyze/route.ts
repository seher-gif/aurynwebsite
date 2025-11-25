import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { domain } = await request.json();

        if (!domain) {
            return NextResponse.json({ error: "Domain is required" }, { status: 400 });
        }

        // Simulate SEO analysis (in real app, would use actual SEO tools/APIs)
        const score = Math.floor(Math.random() * 20) + 80; // 80-100 range

        const analysis = {
            score,
            summary: score >= 90
                ? "Harika! Siteniz genel olarak iyi bir SEO performansına sahip. Küçük iyileştirmelerle daha da iyileştirebilir."
                : "Siteniz genel olarak iyi durumda, ancak birkaç iyileştirme ile daha da iyileştirebilir.",
            breakdown: {
                speed: Math.floor(Math.random() * 10) + 90,
                accessibility: Math.floor(Math.random() * 5) + 95,
                bestPractices: Math.floor(Math.random() * 15) + 85,
            },
            issues: [
                { type: "error", message: "Kırık linkler kontrol edilmeli.", priority: "high" },
                { type: "warning", message: "Meta description olmayan 8 sayfa var.", priority: "medium" },
                { type: "success", message: "Mobil-uyumluluk testi yapılmıştır.", priority: "low" },
                { type: "warning", message: "Görseller için alt text eklenmelidir.", priority: "medium" },
            ],
        };

        return NextResponse.json(analysis);
    } catch (error) {
        console.error("SEO analysis failed:", error);
        return NextResponse.json(
            { error: "Analysis failed" },
            { status: 500 }
        );
    }
}
