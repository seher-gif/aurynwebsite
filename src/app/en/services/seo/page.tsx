import type { Metadata } from "next";
import { Search, FileText, BarChart, Globe, TrendingUp } from "lucide-react";
import { pageMetadata } from "@/lib/seo/site";
import { ServicePageTemplate, type ServicePageData } from "@/components/marketing/service-page-template";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/services/seo",
    title: "SEO Consultancy & Data-Driven Search Optimization",
    description: "Professional SEO consultancy for Turkey-based and international brands. Technical SEO, content strategy, and authority building to grow organic traffic and revenue.",
});

const data: ServicePageData = {
    locale: "en",
    path: "/en/services/seo",
    serviceName: "SEO Consultancy",
    serviceTypeForSchema: "Search Engine Optimization",
    schemaDescription: "Technical SEO, content strategy and off-page authority building focused on sustainable organic growth.",
    heroGradient: "from-green-900/20 via-black to-auryn-magenta/20",
    heroTitleLine1: "SEO Consultancy and",
    heroTitleLine2: "Data-Driven Search Optimization",
    heroDescription:
        "Standing out in search results where millions of sites compete is a technical discipline. We combine growth-hacking principles with a sustainable, long-term strategy.",
    heroCtaLabel: "Free SEO Analysis",
    heroCtaHref: "/en/seo-analysis",
    sections: [
        {
            heading: "Why Work With a Professional SEO Consultant?",
            columns: 3,
            tone: "darker",
            cards: [
                { title: "Time & Resource Efficiency", description: "Skip the trial and error. Proven, data-driven strategies get you to results faster and protect your budget." },
                { title: "Sustainable Growth", description: "You don't want your traffic to stop the moment you pause ad spend. Organic growth compounds your brand's digital value." },
                { title: "Data-Driven Decisions", description: "Every process is managed against Google Search Console, Ahrefs, SEMrush and GA4 data — not guesswork." },
            ],
        },
        {
            heading: "Our 360° Search Optimization Process",
            columns: 3,
            tone: "dark",
            cards: [
                {
                    icon: Search,
                    title: "Technical SEO",
                    features: [
                        "Core Web Vitals and speed optimization",
                        "Mobile-first indexing readiness",
                        "Crawl budget management",
                        "Site architecture and SSL configuration",
                    ],
                },
                {
                    icon: FileText,
                    title: "Content Strategy & Semantic SEO",
                    features: [
                        "Keyword research and intent analysis",
                        "Technical and educational content production",
                        "On-page SEO (H1, H2, meta, internal links)",
                        "E-E-A-T focused authority building",
                    ],
                },
                {
                    icon: BarChart,
                    title: "Off-Page Authority Building",
                    features: [
                        "Quality backlink acquisition",
                        "Toxic link cleanup (disavow)",
                        "Digital PR",
                        "Domain authority growth",
                    ],
                },
            ],
        },
        {
            heading: "Market & Industry-Specific Strategies",
            columns: 2,
            tone: "darker",
            cards: [
                {
                    icon: Globe,
                    title: "Tourism & Hospitality SEO",
                    features: [
                        "Local SEO and Google Maps optimization",
                        "Multilingual SEO strategies (EN, DE, RU, TR)",
                        "Dedicated content for hotels and health tourism",
                    ],
                },
                {
                    icon: TrendingUp,
                    title: "B2B & Industrial SEO",
                    features: [
                        "B2B SEO targeting procurement professionals",
                        "Optimization for technical terms and product codes",
                        "Visibility in export markets (EU, US, Middle East)",
                    ],
                },
            ],
        },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
        {
            question: "How long does SEO take to show results?",
            answer: "SEO is a marathon, not a sprint. Depending on competition and your site's history, the impact of technical improvements typically starts showing within 1-3 months. Lasting ranking gains and meaningful traffic growth generally take 6-12 months.",
        },
        {
            question: "How is SEO consultancy priced?",
            answer: "Every project's needs differ. Pricing depends on your site's page count, keyword competitiveness, content needs, and technical foundation. We build a custom roadmap and proposal for your brand.",
        },
        {
            question: "Why work with an SEO specialist instead of doing it myself?",
            answer: "You can handle the basics yourself. But in a world this driven by algorithms, technical nuance, and competition, a professional SEO specialist saves you time and protects your budget from costly missteps (like black-hat SEO risks).",
        },
        {
            question: "Do I need both Google Ads and SEO?",
            answer: "Yes. Google Ads brings you traffic 'now' — for as long as you're paying. SEO brings you traffic that's 'lasting' and 'free' — for as long as you keep investing in it. The healthiest strategy uses both together.",
        },
    ],
    ctaHeading: "Don't Leave Your Digital Future to Chance",
    ctaDescription: "If you're not on page one of Google, you're effectively invisible online. Let's run a free analysis of your site and uncover your growth potential together.",
    ctaLabel: "Get a Free SEO Analysis",
    ctaHref: "/en/seo-analysis",
    breadcrumb: [
        { name: "Home", path: "/en" },
        { name: "Services", path: "/en/services" },
        { name: "SEO", path: "/en/services/seo" },
    ],
};

export default function SEOPage() {
    return <ServicePageTemplate {...data} />;
}
