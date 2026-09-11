import type { Metadata } from "next";
import { Instagram, Linkedin, Video, Users, BarChart3 } from "lucide-react";
import { pageMetadata } from "@/lib/seo/site";
import { ServicePageTemplate, type ServicePageData } from "@/components/marketing/service-page-template";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/services/social-media",
    title: "Professional Social Media Management & Content Strategy",
    description: "We manage your brand's digital voice. Instagram, LinkedIn and YouTube-focused social media management and content production for local and global audiences.",
});

const data: ServicePageData = {
    locale: "en",
    path: "/en/services/social-media",
    serviceName: "Social Media Management",
    serviceTypeForSchema: "Social Media Marketing",
    schemaDescription: "Strategic social media management and creative content production across Instagram, LinkedIn and YouTube.",
    heroGradient: "from-pink-900/20 via-black to-auryn-magenta/20",
    heroTitleLine1: "Professional Social Media Management and",
    heroTitleLine2: "Creative Content Strategy",
    heroDescription:
        "We don't run your social accounts as a follower-counting exercise — we run them as strategic communication channels that reflect your brand identity and serve your commercial goals.",
    heroCtaLabel: "Free Strategy Call",
    heroCtaHref: "/en/contact",
    sections: [
        {
            heading: "Why a Professional Social Media Agency?",
            columns: 3,
            tone: "darker",
            cards: [
                { title: "Consistent Brand Image", description: "From your logo to your tone of voice to your visual style, we keep every platform on-brand." },
                { title: "Algorithm-Aware Content", description: "Instagram Reels, LinkedIn articles, YouTube Shorts — we plan what to post and when, based on data, not guesswork." },
                { title: "Crisis Management", description: "When negative comments or a crisis moment hits, we bring the professional communication response that protects your brand." },
            ],
        },
        {
            heading: "Our 360° Social Media & Content Process",
            columns: 4,
            tone: "dark",
            cards: [
                { icon: BarChart3, title: "Strategy & Planning", description: "We analyze your audience, study your competitors, and build a monthly content calendar." },
                { icon: Video, title: "Creative Content Production", description: "Graphic design, video editing, Reels and trend-aware content, produced in-house." },
                { icon: Users, title: "Community Management", description: "We respond to messages, comments and mentions in your brand's voice." },
                { icon: BarChart3, title: "Analysis & Reporting", description: "At month's end, we measure your social performance transparently with detailed reporting." },
            ],
        },
        {
            heading: "Platform & Industry-Focused Solutions",
            columns: 3,
            tone: "darker",
            cards: [
                { icon: Linkedin, title: "LinkedIn Management (B2B)", features: ["Company page and thought leadership", "Trade show presence and corporate milestones", "Reaching decision-makers (CEOs, procurement leads)"] },
                { icon: Instagram, title: "Instagram & Facebook (Tourism)", features: ["Experience-driven visual content", "Reels and aesthetic photography", "Storytelling built around guest satisfaction"] },
                { icon: Video, title: "YouTube & Video Content", features: ["Product demonstration videos", "'How-to' content", "Corporate brand films"] },
            ],
        },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
        { question: "How many posts do you publish per week?", answer: "Posting frequency depends on your industry and goals. We offer standard packages as well as fully custom plans. What matters isn't the number, but engagement quality." },
        { question: "Do you shoot photos and videos?", answer: "Yes. For clients based in Antalya, we offer professional shoots (drone, on-location, product photography). For clients elsewhere, we edit existing materials or license stock video/imagery." },
        { question: "Do B2B companies actually need social media?", answer: "Absolutely. B2B buyers check your LinkedIn and Instagram before deciding to work with you, to confirm your company is active, credible and legitimate. A stale profile raises the question, 'Is this company still in business?'" },
        { question: "Do you buy followers?", answer: "No, never. Fake (bot) followers tank your engagement rate and can get your account penalized by the algorithm. We grow real, relevant followers through organic strategy and targeted advertising." },
    ],
    ctaHeading: "Put Your Brand's Digital Storefront in Professional Hands",
    ctaDescription: "Let's review your accounts, identify the gaps, and build a content strategy built specifically for you.",
    ctaLabel: "Get Started",
    ctaHref: "/en/contact",
    breadcrumb: [
        { name: "Home", path: "/en" },
        { name: "Services", path: "/en/services" },
        { name: "Social Media", path: "/en/services/social-media" },
    ],
};

export default function SocialMediaPage() {
    return <ServicePageTemplate {...data} />;
}
