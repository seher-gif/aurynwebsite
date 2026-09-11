import type { Metadata } from "next";
import { TrendingUp, Target, Shield, BarChart, CheckCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo/site";
import { ServicePageTemplate, type ServicePageData } from "@/components/marketing/service-page-template";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/services/google-ads",
    title: "Google Ads Management & Performance Marketing",
    description: "Data-driven Google Ads management. Budget optimization, negative keyword management and conversion-focused strategy to grow your ROI.",
});

const data: ServicePageData = {
    locale: "en",
    path: "/en/services/google-ads",
    serviceName: "Google Ads Management",
    serviceTypeForSchema: "Paid Search Advertising",
    schemaDescription: "Data-driven Google Ads management across Search, Display and Shopping, optimized for ROI.",
    heroGradient: "from-blue-900/20 via-black to-auryn-magenta/20",
    heroTitleLine1: "Google Ads Management and",
    heroTitleLine2: "Data-Driven Performance Marketing",
    heroDescription:
        "Success in digital advertising isn't measured by how much you spend, but by how efficiently that budget is managed. Our Google Ads consultancy optimizes spend to maximize your ROI.",
    heroCtaLabel: "Free Account Audit",
    heroCtaHref: "/en/contact",
    sections: [
        {
            heading: "What Does Professional Google Ads Management Cover?",
            subheading: "A successful campaign requires continuous data analysis and optimization.",
            columns: 3,
            tone: "darker",
            cards: [
                { icon: Target, title: "Account Structure & Strategy", features: ["High-intent keyword analysis", "Campaign setup for a strong Quality Score", "Full measurement via Google Tag Manager"] },
                { icon: TrendingUp, title: "Search Network Ads", features: ["Negative keyword management", "Ad copy A/B testing", "Lowering cost through higher CTR"] },
                { icon: Shield, title: "Display Network & Remarketing", features: ["Behavior-based segmentation", "Cart-abandonment win-back", "Personalized creative strategies"] },
                { icon: BarChart, title: "Google Shopping", features: ["Product feed optimization", "Merchant Center error resolution", "Per-product performance tracking"] },
                { icon: CheckCircle, title: "B2B & LinkedIn Integration", features: ["Decision-maker targeting", "LinkedIn Ads synchronization", "Lead-quality focused strategy"] },
                { icon: TrendingUp, title: "Conversion & ROI Tracking", features: ["CRM integration", "Offline conversion tracking", "Attribution modeling"] },
            ],
        },
        {
            heading: "Why Work With a Google Ads Specialist?",
            columns: 3,
            tone: "dark",
            cards: [
                { title: "Budget Efficiency", description: "Irrelevant clicks are filtered out so your budget only reaches genuine prospects. Negative keyword strategy prevents waste." },
                { title: "Lower Cost Per Click", description: "Quality Score optimization means you can rank higher while paying less than competitors." },
                { title: "Transparent Reporting", description: "Track your performance live, 24/7, through transparent Google Looker Studio dashboards." },
            ],
        },
    ],
    faqHeading: "Frequently Asked Questions",
    faqSubheading: "Common questions about Google Ads",
    faqs: [
        { question: "What budget should I allocate for Google Ads?", answer: "There's no minimum spend requirement — you set your own budget. But to be competitive and see meaningful results, an ideal starting level depends on your industry and CPC rates. We plan and recommend the optimal budget for your goals." },
        { question: "Google Ads or SEO — which should I invest in?", answer: "These channels complement rather than replace each other. Google Ads brings traffic the moment you launch a campaign — fast results and cash flow. SEO is a long-term investment that lowers your ad costs over time. The healthiest growth strategy starts with Ads and builds SEO authority in parallel." },
        { question: "Does Google Ads work for B2B and industrial companies?", answer: "Absolutely. B2B buyers, engineers, and executives research suppliers on Google too. Our B2B strategy focuses on qualified lead capture — quote requests, catalog downloads, WhatsApp contact — rather than direct e-commerce sales." },
        { question: "When do my ads start running?", answer: "Once campaign structure, keyword selection, and ad copy are ready, they go through Google's review — usually approved within 24 hours — and then start showing to your target audience." },
        { question: "Can you stop competitors from clicking my ads?", answer: "Fully blocking it is technically impossible, but Google's algorithms detect and credit back 'invalid clicks.' We also filter suspicious traffic through IP blocking and behavior analysis to protect your budget." },
        { question: "Do you only work with businesses in Antalya?", answer: "Our base is in Antalya, but digital marketing has no borders. We manage advertising for companies across Turkey's major cities and brands exporting to Europe, the US, and the Middle East." },
    ],
    ctaHeading: "Manage Your Ad Budget as Efficiently as Possible",
    ctaDescription: "Digital marketing isn't a guessing game. With the right math, the right strategy, and professional management, your ad spend can return far more than you put in.",
    ctaLabel: "Request a Free Account Audit",
    ctaHref: "/en/contact",
    breadcrumb: [
        { name: "Home", path: "/en" },
        { name: "Services", path: "/en/services" },
        { name: "Google Ads", path: "/en/services/google-ads" },
    ],
};

export default function GoogleAdsPage() {
    return <ServicePageTemplate {...data} />;
}
