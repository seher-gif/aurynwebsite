import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/site";
import { HealthTourismPage, HEALTH_TOURISM_PATHS } from "@/components/pages/health-tourism";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: HEALTH_TOURISM_PATHS.en,
    title: "Health Tourism SEO & Digital Marketing",
    description: "SEO, multilingual content, Google Ads and Meta campaigns for clinics, hospitals and medical travel agencies. Reach international patients with measurable demand.",
});

export default function HealthTourismServicePage() {
    return <HealthTourismPage locale="en" />;
}
