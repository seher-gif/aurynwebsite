import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SeoAnalyzer } from "@/components/seo/seo-analyzer";
import { pageMetadata } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
    locale: "tr",
    path: "/seo-analizi",
    title: "Ücretsiz SEO Analizi",
    description: "Web sitenizin SEO puanını ücretsiz öğrenin. Google E-E-A-T standartlarına göre teknik SEO, içerik ve performans analizinizi anında görün.",
});

export default function SEOAnalysisPage() {
    return (
        <div className="bg-black min-h-screen">
            <JsonLd data={breadcrumbSchema([
                { name: "Anasayfa", path: "/" },
                { name: "SEO Analizi", path: "/seo-analizi" },
            ])} />
            <Header />
            <SeoAnalyzer locale="tr" />
            <Footer />
        </div>
    );
}
