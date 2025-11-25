"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
    useEffect(() => {
        // Log 404 error
        const log404 = async () => {
            try {
                await fetch("/api/log-404", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        path: window.location.pathname,
                        referrer: document.referrer,
                    }),
                });
            } catch (error) {
                console.error("Failed to log 404", error);
            }
        };

        log404();
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-auryn-magenta">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl font-heading">
                        Sayfa Bulunamadı
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Aradığınız sayfayı bulamadık. Silinmiş veya taşınmış olabilir.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button variant="gradient" asChild>
                            <Link href="/">Anasayfaya Dön</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/iletisim">İletişime Geç</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
