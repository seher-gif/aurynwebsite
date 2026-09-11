import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as cheerio from "cheerio";
import { assertPublicHttpUrl, safeFetchPublicUrl, UnsafeUrlError } from "@/lib/seo/safe-fetch";
import { notifySeoAnalysisDbFailure } from "@/lib/email/resend";
import type { Locale } from "@/lib/i18n/routes";

const PAGESPEED_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

type SEOMetricStatus = "success" | "warning" | "error";

interface SEOMetric {
    label: string;
    status: SEOMetricStatus;
    message: string;
}

interface PageSpeedScore {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
}

interface Screenshot {
    src: string;
    alt: string;
}

interface Opportunity {
    category: string;
    title: string;
    description: string;
    savings: number;
}

interface SEOAnalysisResult {
    url: string;
    score: number; // Overall score
    scores: PageSpeedScore | null;
    performanceAvailable: boolean;
    screenshots: Screenshot[];
    opportunities: Opportunity[];
    metrics: SEOMetric[];
}

export async function POST(request: NextRequest) {
    try {
        const { url, locale: rawLocale } = await request.json();
        const locale: Locale = rawLocale === "en" ? "en" : "tr";

        if (!url || typeof url !== "string") {
            return NextResponse.json(
                { error: locale === "en" ? "URL is required" : "URL gerekli" },
                { status: 400 }
            );
        }

        // URL'yi normalize et
        let normalizedUrl = url.trim();
        if (!/^https?:\/\//i.test(normalizedUrl)) {
            normalizedUrl = "https://" + normalizedUrl;
        }

        // SSRF koruması: dahili/özel ağlara veya localhost'a istek engellenir.
        try {
            await assertPublicHttpUrl(normalizedUrl);
        } catch (error) {
            if (error instanceof UnsafeUrlError) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
            throw error;
        }

        // 1. Google PageSpeed Insights analizi (opsiyonel)
        const pagespeedData = await analyzePageSpeed(normalizedUrl);

        // 2. Custom HTML analizi
        const customMetrics = await analyzeHTML(normalizedUrl, locale);

        // Sonuçları birleştir
        let overallScore: number;
        if (pagespeedData) {
            overallScore = Math.round(
                (pagespeedData.scores.performance +
                    pagespeedData.scores.accessibility +
                    pagespeedData.scores.bestPractices +
                    pagespeedData.scores.seo) / 4
            );
        } else {
            // Performans verisi yoksa skor, ölçülebilen HTML bulgularına göre hesaplanır.
            const successCount = customMetrics.filter((m) => m.status === "success").length;
            overallScore = customMetrics.length > 0
                ? Math.round((successCount / customMetrics.length) * 100)
                : 0;
        }

        const result: SEOAnalysisResult = {
            url: normalizedUrl,
            score: overallScore,
            scores: pagespeedData?.scores ?? null,
            performanceAvailable: Boolean(pagespeedData),
            screenshots: pagespeedData?.screenshots ?? [],
            opportunities: pagespeedData?.opportunities ?? [],
            metrics: customMetrics,
        };

        // Veritabanına kaydet
        try {
            await prisma.seoAnalysis.create({
                data: {
                    domain: normalizedUrl,
                    score: overallScore,
                    results: result as any, // Json type compatibility
                },
            });
        } catch (error) {
            console.error("Failed to save SEO analysis to DB:", error);
            if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL) {
                await notifySeoAnalysisDbFailure({
                    to: process.env.CONTACT_NOTIFICATION_EMAIL,
                    domain: normalizedUrl,
                    score: overallScore,
                }).catch((emailError) => {
                    console.error("Failed to send SEO admin notification:", emailError);
                });
            }
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("SEO analiz hatası:", error);
        return NextResponse.json(
            { error: error.message || "Analiz sırasında bir hata oluştu" },
            { status: 500 }
        );
    }
}

async function analyzePageSpeed(url: string): Promise<{
    scores: PageSpeedScore;
    screenshots: Screenshot[];
    opportunities: Opportunity[];
} | null> {
    if (!PAGESPEED_API_KEY) {
        return null;
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
    )}&key=${PAGESPEED_API_KEY}&category=performance&category=accessibility&category=seo&category=best-practices&strategy=mobile`;

    let data: any;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20_000);
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);
        data = await response.json();
    } catch (error) {
        console.error("PageSpeed API isteği başarısız:", error);
        return null;
    }

    if (data.error) {
        console.error("PageSpeed API hatası:", data.error.message);
        return null;
    }

    const categories = data.lighthouseResult.categories;
    const audits = data.lighthouseResult.audits;

    // Skorları al
    const scores: PageSpeedScore = {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
    };

    // Ekran görüntülerini al
    const screenshots: Screenshot[] = [];
    const thumbnails = audits["screenshot-thumbnails"];
    const finalScreenshot = audits["final-screenshot"];

    if (thumbnails?.details?.items) {
        thumbnails.details.items.forEach((item: any, index: number) => {
            screenshots.push({
                src: item.data,
                alt: `Thumbnail ${index + 1}`,
            });
        });
    }

    if (finalScreenshot?.details?.data) {
        screenshots.push({
            src: finalScreenshot.details.data,
            alt: "Final Screenshot",
        });
    }

    // Fırsatları (opportunities) topla
    const opportunities: Opportunity[] = [];
    const categoryKeys = ["performance", "accessibility", "best-practices", "seo"];
    const categoryTitles: Record<string, string> = {
        performance: "Performance",
        accessibility: "Accessibility",
        "best-practices": "Best Practices",
        seo: "SEO",
    };

    for (const cat of categoryKeys) {
        const auditRefs = data.lighthouseResult.categories[cat]?.auditRefs || [];
        const opps = auditRefs
            .map((ref: any) => audits[ref.id])
            .filter((a: any) => a?.details?.type === "opportunity");

        opps.forEach((item: any) => {
            opportunities.push({
                category: categoryTitles[cat] || cat,
                title: item.title,
                description: item.description || "",
                savings: item.details.overallSavingsMs || 0,
            });
        });
    }

    return { scores, screenshots, opportunities };
}

const ANALYSIS_STRINGS = {
    tr: {
        title: "Başlık (Title Tag)",
        titleMissing: "Sayfa başlığı eksik. SEO için kritik öneme sahip.",
        titleBadLength: (n: number) => `Başlık uzunluğu ${n} karakter. İdeal: 30-60 karakter arası.`,
        titleGood: (n: number) => `Başlık mevcut ve uygun uzunlukta (${n} karakter).`,
        metaDesc: "Meta Açıklama",
        metaDescMissing: "Meta açıklama eksik. Arama sonuçlarında görünürlük için önemli.",
        metaDescBadLength: (n: number) => `Meta açıklama uzunluğu ${n} karakter. İdeal: 120-160 karakter.`,
        metaDescGood: (n: number) => `Meta açıklama mevcut ve uygun uzunlukta (${n} karakter).`,
        h1: "H1 Başlık",
        h1Missing: "H1 başlığı eksik. Her sayfada bir H1 olmalı.",
        h1Multiple: (n: number) => `${n} adet H1 başlığı bulundu. SEO için tek bir H1 önerilir.`,
        h1Good: "H1 başlığı doğru şekilde kullanılmış.",
        images: "Resimler",
        imagesNone: "Sayfada resim bulunamadı.",
        imageAlt: "Resim Alt Metinleri",
        imageAltMissing: (n: number) => `${n} adet resimde alt metni eksik. Erişilebilirlik ve SEO için önemli.`,
        imageAltGood: (n: number) => `Tüm resimlerde alt metni mevcut (${n} resim).`,
        links: "Linkler",
        linksGood: (total: number, external: number) => `Toplam ${total} link bulundu (${external} dış link).`,
        mobile: "Mobil Uyumluluk",
        mobileMissing: "Viewport meta etiketi eksik. Mobil cihazlarda sorun yaşanabilir.",
        mobileGood: "Viewport meta etiketi mevcut.",
        https: "Güvenlik (HTTPS)",
        httpsGood: "Site güvenli bağlantı (HTTPS) kullanıyor.",
        httpsMissing: "Site güvenli bağlantı (HTTPS) kullanmıyor. SEO için önemli.",
        htmlAnalysis: "HTML Analizi",
        htmlError: (msg: string) => `HTML analizi sırasında hata: ${msg}`,
    },
    en: {
        title: "Title Tag",
        titleMissing: "Page title is missing. This is critical for SEO.",
        titleBadLength: (n: number) => `Title length is ${n} characters. Ideal range: 30-60 characters.`,
        titleGood: (n: number) => `Title is present and well-sized (${n} characters).`,
        metaDesc: "Meta Description",
        metaDescMissing: "Meta description is missing. Important for search result visibility.",
        metaDescBadLength: (n: number) => `Meta description length is ${n} characters. Ideal range: 120-160 characters.`,
        metaDescGood: (n: number) => `Meta description is present and well-sized (${n} characters).`,
        h1: "H1 Heading",
        h1Missing: "H1 heading is missing. Every page should have exactly one H1.",
        h1Multiple: (n: number) => `Found ${n} H1 headings. A single H1 per page is recommended for SEO.`,
        h1Good: "H1 heading is used correctly.",
        images: "Images",
        imagesNone: "No images found on the page.",
        imageAlt: "Image Alt Text",
        imageAltMissing: (n: number) => `${n} images are missing alt text. Important for accessibility and SEO.`,
        imageAltGood: (n: number) => `All images have alt text (${n} images).`,
        links: "Links",
        linksGood: (total: number, external: number) => `Found ${total} links total (${external} external).`,
        mobile: "Mobile Friendliness",
        mobileMissing: "Viewport meta tag is missing. May cause issues on mobile devices.",
        mobileGood: "Viewport meta tag is present.",
        https: "Security (HTTPS)",
        httpsGood: "Site uses a secure (HTTPS) connection.",
        httpsMissing: "Site does not use a secure (HTTPS) connection. Important for SEO.",
        htmlAnalysis: "HTML Analysis",
        htmlError: (msg: string) => `Error during HTML analysis: ${msg}`,
    },
};

async function analyzeHTML(url: string, locale: Locale): Promise<SEOMetric[]> {
    const metrics: SEOMetric[] = [];
    const t = ANALYSIS_STRINGS[locale];

    try {
        // HTML'i SSRF korumalı şekilde fetch et (timeout, boyut ve yönlendirme limiti dahil)
        const { body: html } = await safeFetchPublicUrl(url);
        const $ = cheerio.load(html);

        // 1. Meta Tag Analizi
        const title = $("title").text();
        const metaDescription = $('meta[name="description"]').attr("content") || "";

        if (!title) {
            metrics.push({ label: t.title, status: "error", message: t.titleMissing });
        } else if (title.length < 30 || title.length > 60) {
            metrics.push({ label: t.title, status: "warning", message: t.titleBadLength(title.length) });
        } else {
            metrics.push({ label: t.title, status: "success", message: t.titleGood(title.length) });
        }

        if (!metaDescription) {
            metrics.push({ label: t.metaDesc, status: "error", message: t.metaDescMissing });
        } else if (metaDescription.length < 120 || metaDescription.length > 160) {
            metrics.push({ label: t.metaDesc, status: "warning", message: t.metaDescBadLength(metaDescription.length) });
        } else {
            metrics.push({ label: t.metaDesc, status: "success", message: t.metaDescGood(metaDescription.length) });
        }

        // 2. Başlık (Heading) Analizi
        const h1Count = $("h1").length;
        if (h1Count === 0) {
            metrics.push({ label: t.h1, status: "error", message: t.h1Missing });
        } else if (h1Count > 1) {
            metrics.push({ label: t.h1, status: "warning", message: t.h1Multiple(h1Count) });
        } else {
            metrics.push({ label: t.h1, status: "success", message: t.h1Good });
        }

        // 3. Resim Analizi
        const images = $("img");
        let missingAltCount = 0;
        images.each((_, img) => {
            const alt = $(img).attr("alt");
            if (!alt || alt.trim() === "") {
                missingAltCount++;
            }
        });

        if (images.length === 0) {
            metrics.push({ label: t.images, status: "warning", message: t.imagesNone });
        } else if (missingAltCount > 0) {
            metrics.push({ label: t.imageAlt, status: "error", message: t.imageAltMissing(missingAltCount) });
        } else {
            metrics.push({ label: t.imageAlt, status: "success", message: t.imageAltGood(images.length) });
        }

        // 4. Link Analizi
        const links = $("a[href]");
        const externalLinks = links.filter((_, link) => {
            const href = $(link).attr("href") || "";
            return href.startsWith("http") && !href.includes(new URL(url).hostname);
        });

        metrics.push({ label: t.links, status: "success", message: t.linksGood(links.length, externalLinks.length) });

        // 5. Mobile Viewport
        const viewport = $('meta[name="viewport"]').attr("content");
        if (!viewport) {
            metrics.push({ label: t.mobile, status: "error", message: t.mobileMissing });
        } else {
            metrics.push({ label: t.mobile, status: "success", message: t.mobileGood });
        }

        // 6. HTTPS Kontrolü
        if (url.startsWith("https://")) {
            metrics.push({ label: t.https, status: "success", message: t.httpsGood });
        } else {
            metrics.push({ label: t.https, status: "error", message: t.httpsMissing });
        }

    } catch (error: any) {
        metrics.push({ label: t.htmlAnalysis, status: "error", message: t.htmlError(error.message) });
    }

    return metrics;
}
