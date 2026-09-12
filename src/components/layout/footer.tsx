"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import type { Locale } from "@/lib/i18n/routes";

const NAV: Record<Locale, {
    tagline: string;
    partnersLabel: string;
    servicesLabel: string;
    companyLabel: string;
    legalLabel: string;
    rights: string;
    services: { name: string; href: string }[];
    company: { name: string; href: string }[];
    legal: { name: string; href: string }[];
}> = {
    tr: {
        tagline: "Veri odaklı dijital performans ajansı. Markanızı dijital dünyada büyütüyoruz.",
        partnersLabel: "Partnerlerimiz",
        servicesLabel: "Hizmetler",
        companyLabel: "Kurumsal",
        legalLabel: "Yasal",
        rights: "Tüm hakları saklıdır.",
        services: [
            { name: "SEO Optimizasyonu", href: "/hizmetler/seo-optimizasyonu" },
            { name: "Google Ads Yönetimi", href: "/hizmetler/google-ads-yonetimi" },
            { name: "Performans Pazarlama", href: "/performans-pazarlama-reklam-yonetimi" },
            { name: "Sosyal Medya Yönetimi", href: "/hizmetler/sosyal-medya-yonetimi" },
            { name: "İçerik Pazarlaması", href: "/hizmetler/icerik-pazarlamasi" },
            { name: "Meta Ads", href: "/hizmetler/meta-ads" },
            { name: "Raporlama & Analiz", href: "/hizmetler/raporlama-analiz" },
        ],
        company: [
            { name: "Hakkımızda", href: "/hakkimizda" },
            { name: "Blog", href: "/blog" },
            { name: "Kariyer", href: "/kariyer" },
            { name: "İletişim", href: "/iletisim" },
        ],
        legal: [
            { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
            { name: "Kullanım Koşulları", href: "/kullanim-kosullari" },
            { name: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
        ],
    },
    en: {
        tagline: "A data-driven digital performance agency. We grow your brand's digital presence.",
        partnersLabel: "Our Partners",
        servicesLabel: "Services",
        companyLabel: "Company",
        legalLabel: "Legal",
        rights: "All rights reserved.",
        services: [
            { name: "SEO", href: "/en/services/seo" },
            { name: "Google Ads Management", href: "/en/services/google-ads" },
            { name: "Meta Ads", href: "/en/services/meta-ads" },
            { name: "Social Media Management", href: "/en/services/social-media" },
            { name: "Content Marketing", href: "/en/services/content-marketing" },
            { name: "Analytics & Reporting", href: "/en/services/analytics-reporting" },
        ],
        company: [
            { name: "About", href: "/en/about" },
            { name: "Blog", href: "/en/blog" },
            { name: "Contact", href: "/en/contact" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/gizlilik-politikasi" },
            { name: "Terms of Use", href: "/kullanim-kosullari" },
            { name: "KVKK Notice", href: "/kvkk-aydinlatma-metni" },
        ],
    },
};

const social = [
    { name: "Instagram", href: "https://www.instagram.com/auryndijital/", icon: Instagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/auryn-dijital/", icon: Linkedin },
];

const PARTNERS = [
    { name: "Meta", src: "/partners/meta.svg" },
    { name: "TikTok", src: "/partners/tiktok.svg" },
    { name: "Yandex", src: "/partners/yandex.svg" },
    { name: "Google", src: "/partners/google.svg" },
];

export function Footer({ locale = "tr" }: { locale?: Locale }) {
    const navigation = NAV[locale];
    const homeHref = locale === "tr" ? "/" : "/en";
    return (
        <footer className="bg-black border-t border-white/10" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Logo and Partners Section */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <Link href={homeHref} className="-m-1.5 p-1.5 mb-4 inline-block">
                                <Image src="/auryn-logo.png" alt="Auryn Dijital" width={400} height={134} className="h-48 w-auto" />
                            </Link>
                            <p className="text-sm leading-6 text-gray-400 max-w-xs">
                                {navigation.tagline}
                            </p>
                            <div className="flex space-x-6">
                                {social.map((item) => (
                                    <Link key={item.name} href={item.href} className="text-gray-400 hover:text-auryn-magenta transition-colors">
                                        <span className="sr-only">{item.name}</span>
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">{navigation.partnersLabel}</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {PARTNERS.map((partner) => (
                                    <div key={partner.name} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-center hover:border-auryn-magenta/30 hover:bg-white/10 transition-all">
                                        <Image
                                            src={partner.src}
                                            alt={`${partner.name} Partner`}
                                            width={120}
                                            height={60}
                                            className="w-full h-auto max-h-12 object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">{navigation.servicesLabel}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.services.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">{navigation.companyLabel}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">{navigation.legalLabel}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                {/* This div is now empty or can be removed if no other content is intended here */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} Auryn Dijital. {navigation.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}
