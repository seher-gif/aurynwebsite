import Image from "next/image";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/i18n/routes";

const STRINGS: Record<Locale, { eyebrow: string; title: string; highlight: string; subtitle: string }> = {
    tr: {
        eyebrow: "Referanslarımız",
        title: "Bizimle Büyüyen",
        highlight: "Markalar",
        subtitle: "Moda, e-ticaret, sanayi ve hizmet sektörlerinde birlikte çalıştığımız markalar.",
    },
    en: {
        eyebrow: "Our Clients",
        title: "Brands That Grow",
        highlight: "With Us",
        subtitle: "Brands we work with across fashion, e-commerce, industry and services.",
    },
};

async function getClients() {
    try {
        return await prisma.client.findMany({ where: { active: true }, orderBy: { order: "asc" } });
    } catch {
        return [];
    }
}

export async function ReferencesSection({ locale = "tr" }: { locale?: Locale }) {
    const clients = await getClients();
    if (clients.length === 0) return null;
    const t = STRINGS[locale];

    return (
        <section aria-labelledby="references-heading" className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-28 relative">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-base font-semibold leading-7 text-auryn-magenta">{t.eyebrow}</h2>
                <p id="references-heading" className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {t.title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">{t.highlight}</span>
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-400">{t.subtitle}</p>
            </div>
            <ul className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-5">
                {clients.map((client) => {
                    const img = (
                        <Image
                            src={client.logo}
                            alt={client.name}
                            fill
                            sizes="(max-width: 640px) 45vw, 220px"
                            unoptimized={!client.logo.startsWith("/")}
                            className="object-contain"
                        />
                    );
                    return (
                        <li
                            key={client.id}
                            className="group w-[calc(50%-0.5rem)] sm:w-52 lg:w-56 rounded-2xl bg-white ring-1 ring-white/10 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-auryn-magenta/20"
                        >
                            <div className="relative mx-auto h-24 sm:h-28 m-5 sm:m-6">
                                {client.website ? (
                                    <a href={client.website} target="_blank" rel="noopener noreferrer nofollow" aria-label={client.name} className="absolute inset-0 block">
                                        {img}
                                    </a>
                                ) : (
                                    img
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
