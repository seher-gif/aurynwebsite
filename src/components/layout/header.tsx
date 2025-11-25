"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetler", href: "/hizmetler" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/iletisim" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed inset-x-0 top-0 z-50 transition-all duration-300",
            scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        )}>
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold tracking-tighter text-white">
                        AURYN<span className="text-auryn-magenta">.</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className={cn(
                            "text-sm font-semibold leading-6 transition-colors",
                            scrolled ? "text-white hover:text-auryn-magenta" : "text-white hover:text-auryn-magenta"
                        )}>
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
                    <Button variant="outline" className={cn(
                        "border-white/20 hover:bg-white/10 transition-colors",
                        scrolled ? "text-white hover:text-white" : "text-white hover:text-white"
                    )} asChild>
                        <Link href="/seo-analysis">SEO Analizi</Link>
                    </Button>
                    <Button className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0" asChild>
                        <Link href="/iletisim">Teklif Al</Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={cn("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm border-l border-white/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold tracking-tighter text-white">
                            AURYN<span className="text-auryn-magenta">.</span>
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
                            </div>
                            <div className="py-6 flex flex-col gap-y-4">
                                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" asChild>
                                    <Link href="/seo-analysis">SEO Analizi</Link>
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white border-0" asChild>
                                    <Link href="/iletisim">Teklif Al</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

