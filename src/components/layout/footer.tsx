"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

const navigation = {
    hizmetler: [
        { name: "SEO Optimizasyonu", href: "/hizmetler/seo-optimizasyonu" },
        { name: "Google Ads Yönetimi", href: "/hizmetler/google-ads-yonetimi" },
        { name: "Sosyal Medya Yönetimi", href: "/hizmetler/sosyal-medya-yonetimi" },
        { name: "İçerik Pazarlaması", href: "/hizmetler/icerik-pazarlamasi" },
        { name: "Meta Ads", href: "/hizmetler/meta-ads" },
        { name: "Raporlama & Analiz", href: "/hizmetler/raporlama-analiz" },
    ],
    kurumsal: [
        { name: "Hakkımızda", href: "/hakkimizda" },
        { name: "Blog", href: "/blog" },
        { name: "Kariyer", href: "/kariyer" },
        { name: "İletişim", href: "/iletisim" },
    ],
    yasal: [
        { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
        { name: "Kullanım Koşulları", href: "/kullanim-kosullari" },
        { name: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
    ],
    social: [
        {
            name: "Instagram",
            href: "https://www.instagram.com/auryndijital/",
            icon: Instagram,
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/company/auryn-dijital/",
            icon: Linkedin,
        },
    ],
};

export function Footer() {
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
                            <Link href="/" className="-m-1.5 p-1.5 mb-4 inline-block">
                                <Image src="/auryn-logo.png" alt="Auryn Dijital" width={400} height={134} className="h-48 w-auto" />
                            </Link>
                            <p className="text-sm leading-6 text-gray-400 max-w-xs">
                                Veri odaklı dijital performans ajansı. Markanızı dijital dünyada büyütüyoruz.
                            </p>
                            <div className="flex space-x-6">
                                {navigation.social.map((item) => (
                                    <Link key={item.name} href={item.href} className="text-gray-400 hover:text-auryn-magenta transition-colors">
                                        <span className="sr-only">{item.name}</span>
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Partnerlerimiz</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white rounded-lg p-3 flex items-center justify-center hover:scale-105 transition-transform">
                                    <img
                                        src="/partners/meta-business-partner.png"
                                        alt="Meta Business Partner"
                                        className="w-full h-auto max-h-12 object-contain"
                                    />
                                </div>
                                <div className="bg-purple-900/20 rounded-lg p-3 flex items-center justify-center hover:scale-105 transition-transform border border-purple-500/20">
                                    <img
                                        src="/partners/semrush-partner.jpg"
                                        alt="Semrush Partner"
                                        className="w-full h-auto max-h-12 object-contain"
                                    />
                                </div>
                                <div className="bg-white rounded-lg p-3 flex items-center justify-center hover:scale-105 transition-transform">
                                    <img
                                        src="/partners/yandex-partner.png"
                                        alt="Yandex Partner"
                                        className="w-full h-auto max-h-12 object-contain"
                                    />
                                </div>
                                <div className="bg-gradient-to-br from-yellow-100 to-purple-100 rounded-lg p-3 flex items-center justify-center hover:scale-105 transition-transform">
                                    <img
                                        src="/partners/ikas-partner.jpg"
                                        alt="ikas Partner"
                                        className="w-full h-auto max-h-12 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Hizmetler</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.hizmetler.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Kurumsal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.kurumsal.map((item) => (
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
                                <h3 className="text-sm font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Yasal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.yasal.map((item) => (
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
                        &copy; {new Date().getFullYear()} Auryn Dijital. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}
