import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SeoAnalyzer } from "@/components/seo/seo-analyzer";
import { pageMetadata } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/seo-analysis",
    title: "Free SEO Analysis",
    description: "Find out your website's SEO score for free. See your technical SEO, content and performance analysis instantly, measured against Google's E-E-A-T standards.",
});

export default function SEOAnalysisPage() {
    return (
        <div className="bg-black min-h-screen">
            <JsonLd data={breadcrumbSchema([
                { name: "Home", path: "/en" },
                { name: "SEO Analysis", path: "/en/seo-analysis" },
            ])} />
            <Header locale="en" />
            <SeoAnalyzer locale="en" />
            <Footer locale="en" />
        </div>
    );
}
