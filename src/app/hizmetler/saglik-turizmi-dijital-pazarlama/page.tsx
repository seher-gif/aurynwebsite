import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/site";
import { HealthTourismPage, HEALTH_TOURISM_PATHS } from "@/components/pages/health-tourism";

export const metadata: Metadata = pageMetadata({
    locale: "tr",
    path: HEALTH_TOURISM_PATHS.tr,
    title: "Sağlık Turizmi SEO ve Dijital Pazarlama",
    description: "Klinik ve hastaneler için sağlık turizmi SEO'su, çok dilli içerik, Google Ads ve Meta reklamları. Uluslararası hastalara ulaşın, talebi ölçülebilir artırın.",
});

export default function SaglikTurizmiPage() {
    return <HealthTourismPage locale="tr" />;
}
