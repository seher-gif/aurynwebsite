import type { Metadata } from "next";
import { FileText, TrendingUp, Users, Sparkles } from "lucide-react";
import { pageMetadata } from "@/lib/seo/site";
import { ServicePageTemplate, type ServicePageData } from "@/components/marketing/service-page-template";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/services/content-marketing",
    title: "Corporate Content Marketing & Strategic Content Management",
    description: "Turn your brand's voice into authority. Professional content marketing for B2B, industrial and tourism brands — SEO-driven blogs, website copy and storytelling.",
});

const data: ServicePageData = {
    locale: "en",
    path: "/en/services/content-marketing",
    serviceName: "Content Marketing",
    serviceTypeForSchema: "Content Marketing",
    schemaDescription: "SEO-driven blog content, website copywriting, and thought-leadership content built to establish topical authority.",
    heroGradient: "from-purple-900/20 via-black to-auryn-magenta/20",
    heroTitleLine1: "Corporate Content Marketing and",
    heroTitleLine2: "Strategic Content Management",
    heroDescription:
        "Content is a strategic trust-building tool: it proves your expertise, grows your visibility on Google, and turns visitors into loyal customers.",
    heroCtaLabel: "Book a Content Strategy Call",
    heroCtaHref: "/en/contact",
    sections: [
        {
            heading: "Why a Professional Content Agency?",
            columns: 3,
            tone: "darker",
            cards: [
                { icon: Sparkles, title: "Topical Authority", description: "By answering your industry's questions accurately, you become the trusted expert — in Google's eyes and your customers'." },
                { icon: TrendingUp, title: "Organic Traffic & SEO Power", description: "SEO-aligned content brings fresh prospects to your site continuously, without paying for every click." },
                { icon: Users, title: "Funnel Support", description: "Content moves prospects from 'awareness' all the way through to 'purchase.'" },
            ],
        },
        {
            heading: "Technical Content Marketing for B2B & Industrial Brands",
            subheading: "An approach that understands engineering and manufacturing",
            columns: 3,
            tone: "dark",
            cards: [
                { title: "Technical Blogs & Articles", description: "Information-dense content aimed at procurement managers and engineers." },
                { title: "Whitepapers & E-Books", description: "Industry reports exchanged for your B2B prospects' contact details." },
                { title: "Case Studies", description: "Concrete proof for prospects through documented success stories." },
            ],
        },
        {
            heading: "Our Full Content Production Services",
            columns: 2,
            tone: "darker",
            cards: [
                { icon: FileText, title: "SEO-Aligned Blog Management", features: ["Keyword research", "Identifying high-search-volume topics", "Content Google favors and readers enjoy"] },
                { icon: Sparkles, title: "Website Copywriting", features: ["Homepage, about and service page copy", "Copy that captures attention and tells your story well", "Action-driving copy (Buy Now / Request a Quote)"] },
                { icon: Users, title: "Email Marketing (Newsletters)", features: ["Industry news and company updates", "Newsletters featuring special offers", "Strategy built around a strong open rate"] },
                { icon: TrendingUp, title: "LinkedIn Pulse & B2B Articles", features: ["Ghostwritten articles for CEOs and executives", "Thought leadership content", "Building sector-wide authority"] },
            ],
        },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
        { question: "Do you write with AI?", answer: "We use AI tools as an assistant for research and outlining. But the voice, strategy and soul of the writing comes 100% from our human editors and writers. Google can tell the difference between low-value AI content and genuinely human-first writing — and that's what we produce." },
        { question: "How long should blog posts be?", answer: "Length depends on topic depth and competition. A standard blog post might run 800-1000 words, while a comprehensive cornerstone piece can reach 2000+. What matters is the value it delivers, not the word count." },
        { question: "What languages can our content be in?", answer: "For clients targeting global markets, we build native-level content strategies in English, German and Russian, in addition to Turkish — each attuned to that language's cultural nuance." },
        { question: "Does content marketing actually increase sales?", answer: "Yes, but indirectly and powerfully. Content earns trust, and trust is the foundation of B2B and service-sector sales. A customer educated through content buys on value, not just price." },
    ],
    ctaHeading: "Let's Write Your Brand's Story Together",
    ctaDescription: "The right words can turn your brand into the obvious choice. Let's plan your content strategy.",
    ctaLabel: "Get Started",
    ctaHref: "/en/contact",
    breadcrumb: [
        { name: "Home", path: "/en" },
        { name: "Services", path: "/en/services" },
        { name: "Content Marketing", path: "/en/services/content-marketing" },
    ],
};

export default function ContentMarketingPage() {
    return <ServicePageTemplate {...data} />;
}
