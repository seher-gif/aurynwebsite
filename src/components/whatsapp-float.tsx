"use client";

import Link from "next/link";
import Image from "next/image";


export function WhatsAppFloat() {
    return (
        <a
            href="https://wa.me/905319409065"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all"
            aria-label="WhatsApp ile iletişime geç"
        >
            <Image
                src="/whatsapp-gradient.jpg"
                alt="WhatsApp"
                width={64}
                height={64}
                className="h-full w-full rounded-full object-cover"
                unoptimized
            />
        </a>
    );
}
