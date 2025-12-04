import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Google PageSpeed Insights API anahtarı (.env.local dosyasına eklenecek)
const PAGESPEED_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY || "AIzaSyAWJKW_S_HvEJxAlD66_p0PBylUcMFpgrI";

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
    score: number; // Overall score (average of 4 categories)
    scores: PageSpeedScore;
    screenshots: Screenshot[];
    opportunities: Opportunity[];
    metrics: SEOMetric[];
}

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: "URL gerekli" },
                { status: 400 }
            );
        }

        // URL'yi normalize et
        let normalizedUrl = url.trim();
        if (!/^https?:\/\//i.test(normalizedUrl)) {
            normalizedUrl = "https://" + normalizedUrl;
        }

        // 1. Google PageSpeed Insights analizi
        const pagespeedData = await analyzePageSpeed(normalizedUrl);

        // 2. Custom HTML analizi
        const customMetrics = await analyzeHTML(normalizedUrl);

        // Sonuçları birleştir
        const overallScore = Math.round(
            (pagespeedData.scores.performance +
                pagespeedData.scores.accessibility +
                pagespeedData.scores.bestPractices +
                pagespeedData.scores.seo) / 4
        );

        const result: SEOAnalysisResult = {
            url: normalizedUrl,
            score: overallScore, // Add overall score for backward compatibility
            scores: pagespeedData.scores,
            screenshots: pagespeedData.screenshots,
            opportunities: pagespeedData.opportunities,
            metrics: customMetrics,
        };

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("SEO analiz hatası:", error);
        return NextResponse.json(
            { error: error.message || "Analiz sırasında bir hata oluştu" },
            { status: 500 }
        );
    }
}

async function analyzePageSpeed(url: string) {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
    )}&key=${PAGESPEED_API_KEY}&category=performance&category=accessibility&category=seo&category=best-practices&strategy=mobile`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message || "PageSpeed API hatası");
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

async function analyzeHTML(url: string): Promise<SEOMetric[]> {
    const metrics: SEOMetric[] = [];

    try {
        // HTML'i fetch et
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; SEOBot/1.0)",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // 1. Meta Tag Analizi
        const title = $("title").text();
        const metaDescription = $('meta[name="description"]').attr("content") || "";

        if (!title) {
            metrics.push({
                label: "Başlık (Title Tag)",
                status: "error",
                message: "Sayfa başlığı eksik. SEO için kritik öneme sahip.",
            });
        } else if (title.length < 30 || title.length > 60) {
            metrics.push({
                label: "Başlık (Title Tag)",
                status: "warning",
                message: `Başlık uzunluğu ${title.length} karakter. İdeal: 30-60 karakter arası.`,
            });
        } else {
            metrics.push({
                label: "Başlık (Title Tag)",
                status: "success",
                message: `Başlık mevcut ve uygun uzunlukta (${title.length} karakter).`,
            });
        }

        if (!metaDescription) {
            metrics.push({
                label: "Meta Açıklama",
                status: "error",
                message: "Meta açıklama eksik. Arama sonuçlarında görünürlük için önemli.",
            });
        } else if (metaDescription.length < 120 || metaDescription.length > 160) {
            metrics.push({
                label: "Meta Açıklama",
                status: "warning",
                message: `Meta açıklama uzunluğu ${metaDescription.length} karakter. İdeal: 120-160 karakter.`,
            });
        } else {
            metrics.push({
                label: "Meta Açıklama",
                status: "success",
                message: `Meta açıklama mevcut ve uygun uzunlukta (${metaDescription.length} karakter).`,
            });
        }

        // 2. Başlık (Heading) Analizi
        const h1Count = $("h1").length;
        if (h1Count === 0) {
            metrics.push({
                label: "H1 Başlık",
                status: "error",
                message: "H1 başlığı eksik. Her sayfada bir H1 olmalı.",
            });
        } else if (h1Count > 1) {
            metrics.push({
                label: "H1 Başlık",
                status: "warning",
                message: `${h1Count} adet H1 başlığı bulundu. SEO için tek bir H1 önerilir.`,
            });
        } else {
            metrics.push({
                label: "H1 Başlık",
                status: "success",
                message: "H1 başlığı doğru şekilde kullanılmış.",
            });
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
            metrics.push({
                label: "Resimler",
                status: "warning",
                message: "Sayfada resim bulunamadı.",
            });
        } else if (missingAltCount > 0) {
            metrics.push({
                label: "Resim Alt Metinleri",
                status: "error",
                message: `${missingAltCount} adet resimde alt metni eksik. Erişilebilirlik ve SEO için önemli.`,
            });
        } else {
            metrics.push({
                label: "Resim Alt Metinleri",
                status: "success",
                message: `Tüm resimlerde alt metni mevcut (${images.length} resim).`,
            });
        }

        // 4. Link Analizi
        const links = $("a[href]");
        const externalLinks = links.filter((_, link) => {
            const href = $(link).attr("href") || "";
            return href.startsWith("http") && !href.includes(new URL(url).hostname);
        });

        metrics.push({
            label: "Linkler",
            status: "success",
            message: `Toplam ${links.length} link bulundu (${externalLinks.length} dış link).`,
        });

        // 5. Mobile Viewport
        const viewport = $('meta[name="viewport"]').attr("content");
        if (!viewport) {
            metrics.push({
                label: "Mobil Uyumluluk",
                status: "error",
                message: "Viewport meta etiketi eksik. Mobil cihazlarda sorun yaşanabilir.",
            });
        } else {
            metrics.push({
                label: "Mobil Uyumluluk",
                status: "success",
                message: "Viewport meta etiketi mevcut.",
            });
        }

        // 6. HTTPS Kontrolü
        if (url.startsWith("https://")) {
            metrics.push({
                label: "Güvenlik (HTTPS)",
                status: "success",
                message: "Site güvenli bağlantı (HTTPS) kullanıyor.",
            });
        } else {
            metrics.push({
                label: "Güvenlik (HTTPS)",
                status: "error",
                message: "Site güvenli bağlantı (HTTPS) kullanmıyor. SEO için önemli.",
            });
        }

    } catch (error: any) {
        metrics.push({
            label: "HTML Analizi",
            status: "error",
            message: `HTML analizi sırasında hata: ${error.message}`,
        });
    }

    return metrics;
}
