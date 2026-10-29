"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getAlternatePath, type Locale } from "@/lib/i18n/routes";

const NAV: Record<Locale, { name: string; href: string }[]> = {
    tr: [
        { name: "Anasayfa", href: "/" },
        { name: "Hakkımızda", href: "/hakkimizda" },
        { name: "Hizmetler", href: "/hizmetler" },
        { name: "Sağlık Turizmi", href: "/hizmetler/saglik-turizmi-dijital-pazarlama" },
        { name: "Referanslar", href: "/referanslar" },
        { name: "Blog", href: "/blog" },
        { name: "İletişim", href: "/iletisim" },
    ],
    en: [
        { name: "Home", href: "/en" },
        { name: "About", href: "/en/about" },
        { name: "Services", href: "/en/services" },
        { name: "Health Tourism", href: "/en/services/health-tourism-marketing" },
        { name: "Case Studies", href: "/en/case-studies" },
        { name: "Blog", href: "/en/blog" },
        { name: "Contact", href: "/en/contact" },
    ],
};

const STRINGS: Record<Locale, { seoAnalysis: string; seoAnalysisHref: string; cta: string; ctaHref: string }> = {
    tr: { seoAnalysis: "SEO Analizi", seoAnalysisHref: "/seo-analizi", cta: "Teklif Al", ctaHref: "/iletisim" },
    en: { seoAnalysis: "SEO Analysis", seoAnalysisHref: "/en/seo-analysis", cta: "Get in Touch", ctaHref: "/en/contact" },
};

export function Header({ locale = "tr" }: { locale?: Locale }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation = NAV[locale];
    const t = STRINGS[locale];
    const homeHref = locale === "tr" ? "/" : "/en";
    const otherLocale: Locale = locale === "tr" ? "en" : "tr";
    const switcherHref = (pathname ? getAlternatePath(pathname, locale) : null) || (otherLocale === "en" ? "/en" : "/");

    return (
        <header
            data-test="my-header"
            suppressHydrationWarning
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
            )}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 xl:px-8" aria-label="Global">
                <div className="flex xl:flex-1">
                    <Link href={homeHref} className="-m-1.5 p-0" suppressHydrationWarning>
                        <Image
                            src="/auryn-wordmark.png"
                            alt="Auryn Dijital - Dijital Pazarlama & SEO Ajansı"
                            width={417}
                            height={112}
                            priority
                            className="h-12 w-auto max-w-none shrink-0"
                        />
                        </Link>
                </div>
                <div className="flex xl:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden xl:flex xl:gap-x-6 2xl:gap-x-10">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className={cn(
                            "text-sm font-semibold leading-6 transition-colors",
                            scrolled ? "text-white hover:text-auryn-magenta" : "text-white hover:text-auryn-magenta"
                        )}>
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden xl:flex xl:flex-1 xl:justify-end items-center gap-x-4">
                    <Link
                        href={switcherHref}
                        className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-auryn-magenta transition-colors"
                        aria-label={locale === "tr" ? "Switch to English" : "Türkçe'ye geç"}
                    >
                        <Globe className="h-4 w-4" />
                        {locale === "tr" ? "EN" : "TR"}
                    </Link>
                    <Button variant="outline" className={cn(
                        "hidden 2xl:inline-flex bg-transparent border-white/20 hover:bg-white/10 transition-colors",
                        scrolled ? "text-white hover:text-white" : "text-white hover:text-white"
                    )} asChild>
                        <Link href={t.seoAnalysisHref}>{t.seoAnalysis}</Link>
                    </Button>
                    <Button className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0" asChild>
                        <Link href={t.ctaHref}>{t.cta}</Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={cn("xl:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm border-l border-white/10">
                    <div className="flex items-center justify-between">
                        <Link href={homeHref} className="-m-1.5 p-1.5">
                            <Image src="/auryn-wordmark.png" alt="Auryn Dijital" width={417} height={112} className="h-10 w-auto max-w-none" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 !text-white hover:bg-white/5 hover:!text-auryn-magenta transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    href={switcherHref}
                                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 !text-white hover:bg-white/5 hover:!text-auryn-magenta transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Globe className="h-4 w-4" /> {locale === "tr" ? "English" : "Türkçe"}
                                </Link>
                            </div>
                            <div className="py-6 flex flex-col gap-y-4">
                                <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                                    <Link href={t.seoAnalysisHref}>{t.seoAnalysis}</Link>
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white border-0" asChild>
                                    <Link href={t.ctaHref}>{t.cta}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
