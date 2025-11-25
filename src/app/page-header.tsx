import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ana Sayfa",
    description: "Veri odaklı SEO, Google Ads ve sosyal medya stratejileriyle işletmenizin büyüme potansiyelini açığa çıkarıyoruz.",
};

// Force dynamic to ensure fresh data
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, Search, TrendingUp, Globe, PenTool, Megaphone, BarChart2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/schema";
import { WhatsAppFloat } from "@/components/whatsapp-float";

async function getHeroData() {
    try {
        const hero = await prisma.homepageHero.findFirst();
        return hero;
    } catch (error) {
        console.error("Failed to fetch hero data:", error);
        return null;
    }
}

export default async function Home() {
    const heroData = await getHeroData();

    return (
        <div className="bg-white">
            <OrganizationSchema />
            <LocalBusinessSchema />
            <WhatsAppFloat />
            <Header />
