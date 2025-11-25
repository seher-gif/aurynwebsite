"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { analyzeSEOWithAI } from "@/lib/ai/gemini";

export async function createMarketingTool(formData: FormData) {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const headerCode = formData.get("headerCode") as string;
    const footerCode = formData.get("footerCode") as string;
    const bodyCode = formData.get("bodyCode") as string;

    try {
        await prisma.marketingTool.create({
            data: {
                name,
                type,
                data: {
                    headerCode: headerCode || "",
                    footerCode: footerCode || "",
                    bodyCode: bodyCode || "",
                },
            },
        });

        revalidatePath("/admin/tools");
        return { success: true };
    } catch (error) {
        console.error("Failed to create marketing tool:", error);
        return { success: false, error: "Failed to create tool" };
    }
}

export async function updateMarketingTool(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const headerCode = formData.get("headerCode") as string;
    const footerCode = formData.get("footerCode") as string;
    const bodyCode = formData.get("bodyCode") as string;

    try {
        await prisma.marketingTool.update({
            where: { id },
            data: {
                name,
                type,
                data: {
                    headerCode: headerCode || "",
                    footerCode: footerCode || "",
                    bodyCode: bodyCode || "",
                },
            },
        });

        revalidatePath("/admin/tools");
        return { success: true };
    } catch (error) {
        console.error("Failed to update marketing tool:", error);
        return { success: false, error: "Failed to update tool" };
    }
}

export async function deleteMarketingTool(id: string) {
    try {
        await prisma.marketingTool.delete({
            where: { id },
        });

        revalidatePath("/admin/tools");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete marketing tool:", error);
        return { success: false, error: "Failed to delete tool" };
    }
}

export async function submitSEOAnalysis(formData: FormData) {
    const domain = formData.get("domain") as string;
    const email = formData.get("email") as string;

    try {
        // Perform AI analysis
        const analysis = await analyzeSEOWithAI({ domain, email });

        // Save to ContactMessage
        await prisma.contactMessage.create({
            data: {
                name: "SEO Analiz Talebi",
                email: email || "Belirtilmedi",
                subject: `SEO Analiz - ${domain}`,
                message: `Domain: ${domain}\nSkor: ${analysis.score}/100\n\nÖzet: ${analysis.summary}`,
                status: "NEW",
            },
        });

        // Save to SeoAnalysis
        await prisma.seoAnalysis.create({
            data: {
                domain,
                email,
                score: analysis.score,
                results: analysis,
            },
        });

        revalidatePath("/admin/seo-results");
        revalidatePath("/admin/messages");

        return { success: true, analysis };
    } catch (error) {
        console.error("SEO Analysis failed:", error);
        return { success: false, error: "Analysis failed" };
    }
}
