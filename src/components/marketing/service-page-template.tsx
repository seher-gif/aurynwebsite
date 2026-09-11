import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, type LucideIcon } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo/schema";
import type { Locale } from "@/lib/i18n/routes";
import type { BreadcrumbItem } from "@/lib/seo/schema";

export interface ServiceCard {
    icon?: LucideIcon;
    title: string;
    description?: string;
    features?: string[];
}

export interface ServiceGridSection {
    heading: string;
    subheading?: string;
    columns: 2 | 3 | 4;
    cards: ServiceCard[];
    tone: "dark" | "darker";
}

export interface ServicePageData {
    locale: Locale;
    path: string;
    serviceName: string;
    serviceTypeForSchema: string;
    schemaDescription: string;
    heroGradient: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroDescription: string;
    heroCtaLabel: string;
    heroCtaHref: string;
    sections: ServiceGridSection[];
    faqHeading: string;
    faqSubheading?: string;
    faqs: { question: string; answer: string }[];
    ctaHeading: string;
    ctaDescription: string;
    ctaLabel: string;
    ctaHref: string;
    breadcrumb: BreadcrumbItem[];
}

const COLS: Record<number, string> = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
};

export function ServicePageTemplate(data: ServicePageData) {
    return (
        <div className="bg-black min-h-screen">
            <JsonLd data={breadcrumbSchema(data.breadcrumb)} />
            <JsonLd
                data={serviceSchema({
                    locale: data.locale,
                    name: data.serviceName,
                    description: data.schemaDescription,
                    path: data.path,
                    serviceType: data.serviceTypeForSchema,
                })}
            />
            {data.faqs.length > 0 && <JsonLd data={faqSchema(data.faqs)} />}

            <Header locale={data.locale} />

            {/* Hero */}
            <section className="relative pt-32 pb-20">
                <div className={`absolute inset-0 bg-gradient-to-br ${data.heroGradient}`}></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        {data.heroTitleLine1}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                            {data.heroTitleLine2}
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">{data.heroDescription}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={data.heroCtaHref}>
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white">
                                {data.heroCtaLabel}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {data.sections.map((section, sIdx) => (
                <section key={sIdx} className={`py-20 ${section.tone === "darker" ? "bg-gradient-to-b from-gray-900 to-black" : "bg-black"}`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">{section.heading}</h2>
                            {section.subheading && <p className="text-xl text-gray-400">{section.subheading}</p>}
                        </div>
                        <div className={`grid ${COLS[section.columns]} gap-8`}>
                            {section.cards.map((card, cIdx) => (
                                <div key={cIdx} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                    {card.icon && <card.icon className="h-12 w-12 text-auryn-magenta mb-4" />}
                                    <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                                    {card.description && <p className="text-gray-300">{card.description}</p>}
                                    {card.features && (
                                        <ul className="space-y-3">
                                            {card.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-start text-sm text-gray-300">
                                                    <span className="text-auryn-magenta mr-2">&bull;</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* FAQ */}
            {data.faqs.length > 0 && (
                <section className="py-20 bg-black">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">{data.faqHeading}</h2>
                            {data.faqSubheading && <p className="text-xl text-gray-400">{data.faqSubheading}</p>}
                        </div>
                        <div className="space-y-4">
                            {data.faqs.map((faq, idx) => (
                                <details key={idx} className="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-semibold hover:bg-gray-800/70 transition-colors">
                                        <span>{faq.question}</span>
                                        <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-300">{faq.answer}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">{data.ctaHeading}</h2>
                    <p className="text-xl text-white/90 mb-8">{data.ctaDescription}</p>
                    <Link href={data.ctaHref}>
                        <Button size="lg" className="bg-white text-auryn-magenta hover:bg-gray-100">
                            {data.ctaLabel}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer locale={data.locale} />
        </div>
    );
}
