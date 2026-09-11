import { prisma } from "@/lib/prisma";
import type { Client } from "@prisma/client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { getPublishedCaseStudies } from "@/lib/case-studies/data";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en/case-studies",
    title: "Case Studies",
    description: "Real results from our client work in SEO, Google Ads, and digital marketing. Explore how we've grown brands with data-driven strategy.",
});

export default async function CaseStudiesPage() {
    let clients: Client[] = [];

    try {
        clients = await prisma.client.findMany({
            where: { active: true },
            orderBy: { order: "asc" },
        });
    } catch (error) {
        console.log('Client table not found yet');
    }

    const caseStudies = await getPublishedCaseStudies("en");

    return (
        <div className="bg-black min-h-screen text-white">
            <JsonLd data={breadcrumbSchema([
                { name: "Home", path: "/en" },
                { name: "Case Studies", path: "/en/case-studies" },
            ])} />
            <Header locale="en" />

            {/* Hero Section */}
            <section className="relative bg-black pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-auryn-magenta/10 via-transparent to-transparent opacity-50 blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-auryn-magenta ring-1 ring-inset ring-auryn-magenta/20 bg-auryn-magenta/5 mb-6 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-auryn-magenta mr-2 animate-pulse"></span>
                        Success Stories
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                        Case Studies &amp; <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Client Results</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
                        Real success stories, concrete results, and growth journeys built together with our clients.
                    </p>
                </div>
            </section>

            {/* Client Logos */}
            {clients.length > 0 && (
                <section className="py-12 bg-black border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Trusted By</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
                            {clients.map((client) => (
                                <div
                                    key={client.id}
                                    className="flex items-center justify-center p-6 bg-white/5 rounded-xl border border-white/5 hover:border-auryn-magenta/30 transition-all grayscale hover:grayscale-0"
                                >
                                    {client.website ? (
                                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                                            <Image src={client.logo} alt={client.name} width={150} height={75} className="object-contain max-h-12 w-auto" />
                                        </a>
                                    ) : (
                                        <Image src={client.logo} alt={client.name} width={150} height={75} className="object-contain max-h-12 w-auto" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Case Studies */}
            {caseStudies.length > 0 ? (
                <section className="py-24 bg-black relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Inspiring Results</h2>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                                See how we&apos;ve grown brands with data-driven strategy.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {caseStudies.map((caseStudy) => (
                                <div
                                    key={caseStudy.id}
                                    className="group relative flex flex-col bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-auryn-magenta/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-auryn-magenta/10"
                                >
                                    {caseStudy.coverImage && (
                                        <div className="relative h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10" />
                                            <Image
                                                src={caseStudy.coverImage}
                                                alt={caseStudy.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full text-xs font-medium">
                                                    {caseStudy.category}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-auryn-magenta transition-colors">
                                            {caseStudy.title}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
                                            {caseStudy.client}
                                        </p>
                                        <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                                            {caseStudy.excerpt}
                                        </p>
                                        <Link href={`/en/case-studies/${caseStudy.slug}`} className="mt-auto">
                                            <Button variant="outline" className="w-full justify-between group/btn bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-auryn-magenta hover:text-auryn-magenta transition-all">
                                                View Case Study
                                                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-24 bg-black text-center">
                    <p className="text-gray-400">Case studies coming soon.</p>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 md:p-16 text-center isolate">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-auryn-magenta/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Write Your Own Success Story
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Ready to grow your brand online and get ahead of the competition with SEO and advertising strategy?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/en/contact">
                                <Button size="lg" className="bg-white text-black hover:bg-gray-200 border-0 font-semibold px-8 h-12 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/en/seo-analysis">
                                <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 h-12 px-8 rounded-full">
                                    Free SEO Analysis
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer locale="en" />
        </div>
    );
}
