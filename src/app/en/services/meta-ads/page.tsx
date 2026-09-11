import type { Metadata } from "next";
import { Target, TrendingUp, Zap } from "lucide-react";
import { pageMetadata } from "@/lib/seo/site";
import { ServicePageTemplate, type ServicePageData } from "@/components/marketing/service-page-template";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/services/meta-ads",
    title: "Data-Driven Meta Ads (Facebook & Instagram) Management",
    description: "Maximize ROAS on your Facebook and Instagram ads. Advanced targeting, retargeting and creative strategy to grow sales.",
});

const data: ServicePageData = {
    locale: "en",
    path: "/en/services/meta-ads",
    serviceName: "Meta Ads Management",
    serviceTypeForSchema: "Social Media Advertising",
    schemaDescription: "Facebook and Instagram advertising managed for ROAS, using advanced targeting, retargeting and creative testing.",
    heroGradient: "from-blue-900/20 via-black to-purple-900/20",
    heroTitleLine1: "Data-Driven Meta Ads",
    heroTitleLine2: "(Facebook & Instagram) Management",
    heroDescription:
        "We manage your Meta ads for performance and ROAS (Return on Ad Spend) — not vanity metrics like likes. We put the algorithm's power to work for your brand's growth.",
    heroCtaLabel: "Free Ad Account Review",
    heroCtaHref: "/en/contact",
    sections: [
        {
            heading: "Why Professional Meta Ads Consultancy?",
            columns: 3,
            tone: "darker",
            cards: [
                { icon: Target, title: "Precision Targeting", description: "Interests, behaviors, demographics and Lookalike Audiences make sure you only reach genuine prospects." },
                { icon: TrendingUp, title: "Advanced Tracking", description: "With Meta Pixel and Conversion API (CAPI) set up correctly, we track exactly what a visitor does on your site after clicking your ad." },
                { icon: Zap, title: "Creative Strategy", description: "We build scroll-stopping visuals and copy that get people to actually stop and look." },
            ],
        },
        {
            heading: "Our Meta Ads Strategies & Campaign Structures",
            columns: 2,
            tone: "dark",
            cards: [
                { title: "Cold Audience (Prospecting) Campaigns", features: ["Interest targeting: reaching people following relevant pages", "Lookalike audiences: finding new people similar to existing customers", "Broad targeting to let the algorithm learn"] },
                { title: "Retargeting", features: ["Dynamic Product Ads (DPA): re-showing viewed products", "Abandoned cart flows: converting hesitant shoppers", "Segmented remarketing with behavior-based messaging"] },
                { title: "Lead Generation", features: ["Native Facebook/Instagram lead forms", "Capturing customer data without needing a website visit", "Ideal for services, real estate, education and B2B"] },
                { title: "Catalog Sales (E-Commerce)", features: ["Instagram Shop and Facebook Shop integration", "Showcasing products directly on-platform", "Streamlined, optimized shopping experience"] },
            ],
        },
        {
            heading: "Sector Expertise: Tourism & E-Commerce",
            columns: 2,
            tone: "darker",
            cards: [
                { title: "Tourism & Hospitality Ads", features: ["Visual storytelling that showcases a property's atmosphere", "Seasonal strategy: early booking vs. last-minute campaigns", "Global targeting in the local language for Germany, Russia, the UK and beyond"] },
                { title: "E-Commerce & Retail", features: ["Conversion focus: maximizing ROAS", "Creative testing to find your best-selling visuals", "Catalog optimization: fixing product feed errors"] },
            ],
        },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
        { question: "How much budget should I set aside for Instagram ads?", answer: "Budget depends on your goals and industry competition. You can start with as little as $5-10/day. What matters isn't the size of the budget, but the ROAS it delivers." },
        { question: "Do you produce the images and videos?", answer: "Fifty percent of ad performance comes down to creative. Our in-house design team produces or directs attention-grabbing visuals and videos for your ads." },
        { question: "Did the iOS 14 update kill advertising?", answer: "No, it changed it. Apple's privacy updates made tracking harder, but our Conversion API (CAPI) integrations and server-side tracking solutions minimize data loss and keep ads running efficiently." },
        { question: "Is Facebook dead? Can't we just run Instagram ads?", answer: "That's a common misconception. Facebook remains one of the strongest purchasing platforms, especially for audiences over 35 with real buying power. We use Automatic Placements so Meta's AI can find the cheapest conversion wherever it is." },
    ],
    ctaHeading: "Turn Social Media Into a Sales Channel",
    ctaDescription: "With the right strategy and technical management, we turn your social budget into an investment. Let's review your ad account.",
    ctaLabel: "Get Started",
    ctaHref: "/en/contact",
    breadcrumb: [
        { name: "Home", path: "/en" },
        { name: "Services", path: "/en/services" },
        { name: "Meta Ads", path: "/en/services/meta-ads" },
    ],
};

export default function MetaAdsPage() {
    return <ServicePageTemplate {...data} />;
}
