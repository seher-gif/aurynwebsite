import type { Metadata } from "next";
import { BarChart3, TrendingUp, Database, Eye } from "lucide-react";
import { pageMetadata } from "@/lib/seo/site";
import { ServicePageTemplate, type ServicePageData } from "@/components/marketing/service-page-template";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/services/analytics-reporting",
    title: "Digital Analytics, Measurement & Performance Reporting",
    description: "Data-driven growth strategy. GA4, Looker Studio and conversion tracking to transparently measure the return on your marketing budget.",
});

const data: ServicePageData = {
    locale: "en",
    path: "/en/services/analytics-reporting",
    serviceName: "Analytics & Reporting",
    serviceTypeForSchema: "Marketing Analytics",
    schemaDescription: "GA4 configuration, server-side tracking, and transparent Looker Studio reporting for measuring marketing ROI.",
    heroGradient: "from-cyan-900/20 via-black to-auryn-magenta/20",
    heroTitleLine1: "Digital Analytics,",
    heroTitleLine2: "Measurement & Performance Reporting",
    heroDescription:
        "Track exactly where your marketing budget goes and what it returns, down to the last cent. We turn data into meaningful business intelligence.",
    heroCtaLabel: "Free Data Audit Call",
    heroCtaHref: "/en/contact",
    sections: [
        {
            heading: "Why Professional Analytics?",
            columns: 3,
            tone: "darker",
            cards: [
                { icon: TrendingUp, title: "Budget Optimization", description: "See clearly which channel actually drives sales, and put your money behind the ones that win." },
                { icon: Eye, title: "Understanding User Behavior", description: "Why did a visitor leave without buying? Where did they get stuck? Heatmaps and user-journey analysis surface the bottlenecks." },
                { icon: Database, title: "Personalized Strategy", description: "Process demographic and behavioral data to build segments that deliver the right message at the right time." },
            ],
        },
        {
            heading: "Our End-to-End Data & Reporting Process",
            columns: 2,
            tone: "dark",
            cards: [
                { icon: Database, title: "Technical Setup & Tag Management (GTM)", features: ["Event tracking setup via Google Tag Manager", "Tracking form submissions, phone clicks, WhatsApp contact", "Managing all tracking pixels (Google Ads, Meta, LinkedIn) under one roof"] },
                { icon: BarChart3, title: "Google Analytics 4 (GA4) Optimization", features: ["GA4 account setup and customization", "Configuration for e-commerce or lead goals", "Funnel analysis and audience segmentation"] },
                { icon: TrendingUp, title: "Conversion Tracking & Attribution", features: ["Multi-channel attribution models", "Analyzing which channel starts vs. closes a sale", "Crediting the right channel"] },
                { icon: Eye, title: "Transparent Reporting via Looker Studio", features: ["Custom interactive dashboards for your brand", "Live 24/7 performance access", "Spend, revenue, costs and charts, all in one place"] },
            ],
        },
        {
            heading: "Industry-Specific Analytics Solutions",
            columns: 2,
            tone: "darker",
            cards: [
                { title: "B2B & Industrial Companies", features: ["Macro and micro conversion tracking (quote forms, catalog downloads)", "Lead-quality analysis delivering clean data to sales", "CRM integration and offline conversion tracking"] },
                { title: "Tourism & Hospitality", features: ["Full booking-engine integration", "Cost-per-room and revenue-per-booking analysis", "Seasonal performance comparison and cancellation rates"] },
            ],
        },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
        { question: "How often will we receive reports?", answer: "Auryn Dijital clients get 24/7 live access to data through a custom-built Looker Studio dashboard. We also hold a comprehensive monthly executive summary meeting where we interpret the data and set next month's strategy." },
        { question: "How is data privacy and KVKK compliance handled?", answer: "All our tracking and analysis processes comply with KVKK (Turkey's data protection law) and GDPR standards. We never process personal data without consent, and we set your cookie policies accordingly." },
        { question: "Do you do server-side tracking?", answer: "Yes. To get around browser-based blocking (ad blockers, iOS restrictions) and measure data with near-99% accuracy, we implement Server-Side GTM and Conversion API (CAPI) setups." },
        { question: "Do you integrate with CRMs?", answer: "To measure whether digital leads actually convert to sales, we integrate your ad accounts with the CRM you use (Salesforce, HubSpot, Zoho, etc.) and track offline conversions." },
    ],
    ctaHeading: "Base Decisions on Data, Not Guesswork",
    ctaDescription: "Let's audit your current analytics setup, find where data is leaking, and build a reporting ecosystem built for you.",
    ctaLabel: "Get Started",
    ctaHref: "/en/contact",
    breadcrumb: [
        { name: "Home", path: "/en" },
        { name: "Services", path: "/en/services" },
        { name: "Analytics & Reporting", path: "/en/services/analytics-reporting" },
    ],
};

export default function AnalyticsReportingPage() {
    return <ServicePageTemplate {...data} />;
}
