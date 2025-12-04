import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface SEOAnalysisInput {
    domain: string;
    email?: string;
}

export interface SEOMetric {
    label: string;
    status: "success" | "warning" | "error";
    message: string;
}

export interface SEOAnalysisResult {
    score: number;
    metrics: SEOMetric[];
}

interface PageData {
    url: string;
    title: string;
    metaDescription: string;
    h1: string[];
    h2: string[];
    images: { alt: string; src: string }[];
    textPreview: string;
    canonical: string;
    robots: string;
}

async function fetchPageData(domain: string): Promise<PageData> {
    let url = domain.startsWith('http') ? domain : `https://${domain}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; AurynSEOBot/1.0; +https://auryndijital.com)'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch page: ${response.statusText}`);
        }

        const html = await response.text();

        // Simple regex-based extraction (in a real app, use a parser like cheerio or jsdom)
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
        const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);

        const h1Matches = [...html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)].map(m => m[1].trim());
        const h2Matches = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].map(m => m[1].trim());

        const imgMatches = [...html.matchAll(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi)]
            .map(m => ({ alt: m[1], src: m[2] }));

        // Extract text content (very basic)
        const textPreview = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 2000); // Limit to 2000 chars for prompt

        return {
            url,
            title: titleMatch ? titleMatch[1] : '',
            metaDescription: metaDescMatch ? metaDescMatch[1] : '',
            h1: h1Matches,
            h2: h2Matches,
            images: imgMatches.slice(0, 10), // Limit to 10 images
            textPreview,
            canonical: canonicalMatch ? canonicalMatch[1] : '',
            robots: robotsMatch ? robotsMatch[1] : ''
        };
    } catch (error) {
        console.error("Error fetching page data:", error);
        throw error;
    }
}

export async function analyzeSEOWithAI(input: SEOAnalysisInput): Promise<SEOAnalysisResult> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Fetch real page data
        console.log(`Fetching data for ${input.domain}...`);
        const pageData = await fetchPageData(input.domain);
        console.log("Page data fetched successfully.");

        const prompt = `Sen Google Arama Kalitesi Değerlendirici Yönergeleri (E-E-A-T) konusunda uzmanlaşmış, dünyanın en iyi Teknik ve Semantik SEO Analistisin.
        Görevin: Aşağıdaki ham verileri analiz etmek ve site sahibine "acımasız ama yapıcı" bir profesyonel rapor sunmaktır.
        
        ANALİZ EDİLECEK VERİLER:
        ${JSON.stringify(pageData, null, 2)}

        KURALLAR:
        1. Sadece "var/yok" kontrolü yapma. Örneğin: Başlık var mı diye bakma; başlık "ilgi çekici mi, uzunluğu doğru mu (50-60 karakter), anahtar kelime içeriyor mu" diye bak.
        2. Semantik Analiz Yap: İçerik metnini (text_preview) oku. Konu derinliği yeterli mi? Yoksa yüzeysel mi?
        3. Puanlama (score): Çok cömert olma. Gerçekten mükemmel değilse 90 üzeri verme. 0 ile 100 arası gerçekçi bir puan ver.
        4. Çıktı Formatı: Kesinlikle ve sadece aşağıdaki JSON formatında yanıt ver. Markdown (backticks) kullanma.

        İSTENEN JSON FORMATI:
        {
            "score": number,
            "metrics": [
                {
                    "label": "Kısa Kategori Adı (Örn: Meta Başlık Stratejisi)",
                    "status": "success" | "warning" | "error",
                    "message": "Buraya teknik bir analiz yaz. Örn: 'Başlık 70 karakterden uzun olduğu için Google tarafından kesilebilir, kısaltmalısınız.'"
                },
                ... (Lütfen şu 6 metriği analiz et: 1. Başlık & Meta Kalitesi, 2. Semantik İçerik Derinliği, 3. H1/H2 Başlık Hiyerarşisi, 4. Görsel SEO & Erişilebilirlik, 5. Crawl & İndekslenebilirlik (Canonical vb.), 6. Genel UX/Okunabilirlik)
            ]
        }`;

        console.log("Calling Gemini API...");
        const result = await model.generateContent(prompt);
        console.log("Gemini API response received.");

        const response = await result.response;
        const text = response.text();

        // Clean and parse JSON
        let jsonText = text.trim();
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const analysis: SEOAnalysisResult = JSON.parse(jsonMatch[0]);
        return analysis;

    } catch (error) {
        console.error("Gemini SEO analysis error:", error);

        // Return fallback result if analysis fails
        return {
            score: 0,
            metrics: [
                {
                    label: "Analiz Hatası",
                    status: "error",
                    message: "Site verileri çekilemedi veya analiz edilemedi. Lütfen domain'i kontrol edip tekrar deneyin."
                }
            ]
        };
    }
}

// Export with both names for flexibility
export const analyzeSEO = analyzeSEOWithAI;
