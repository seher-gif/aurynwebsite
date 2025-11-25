import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface SEOAnalysisInput {
    domain: string;
    email?: string;
}

export interface SEOAnalysisResult {
    score: number;
    summary: string;
    recommendations: string[];
    technicalIssues: string[];
    contentAnalysis: string;
    performanceMetrics: {
        loadTime?: string;
        mobileOptimization?: string;
        sslCertificate?: string;
    };
}

export async function analyzeSEOWithAI(input: SEOAnalysisInput): Promise<SEOAnalysisResult> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Sen bir SEO uzmanısın. Aşağıdaki web sitesi için kapsamlı bir SEO analizi yap:

Domain: ${input.domain}

Lütfen şu konularda detaylı bir analiz yap:
1. Genel SEO Skoru (0-100 arası)
2. Özet değerlendirme
3. İyileştirme önerileri (en az 5 madde)
4. Tespit edilen teknik sorunlar
5. İçerik analizi
6. Performans metrikleri (tahmin)

Yanıtını JSON formatında ver:
{
  "score": number,
  "summary": "string",
  "recommendations": ["string"],
  "technicalIssues": ["string"],
  "contentAnalysis": "string",
  "performanceMetrics": {
    "loadTime": "string",
    "mobileOptimization": "string",
    "sslCertificate": "string"
  }
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const analysis: SEOAnalysisResult = JSON.parse(jsonMatch[0]);
        return analysis;
    } catch (error) {
        console.error("Gemini SEO analysis error:", error);
        // Return default result if API fails
        return {
            score: 75,
            summary: "Web siteniz için detaylı bir analiz yapılamadı. Lütfen daha sonra tekrar deneyin.",
            recommendations: [
                "Sayfa yükleme hızınızı optimize edin",
                "Meta açıklamalarınızı güncelleyin",
                "Responsive tasarımı kontrol edin",
            ],
            technicalIssues: [
                "Bazı teknik detaylar API hatası nedeniyle alınamadı",
            ],
            contentAnalysis: "API hatası nedeniyle içerik analizi yapılamadı.",
            performanceMetrics: {
                loadTime: "Orta",
                mobileOptimization: "İyi",
                sslCertificate: "Aktif"
            }
        };
    }
}

// Export with both names for flexibility
export const analyzeSEO = analyzeSEOWithAI;
