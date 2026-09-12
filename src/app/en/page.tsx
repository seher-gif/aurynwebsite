import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, TrendingUp, Globe, PenTool, Megaphone, BarChart2 } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { pageMetadata } from "@/lib/seo/site";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
    locale: "en",
    path: "/en",
    title: "Auryn Dijital - Data-Driven Digital Marketing & SEO",
    description: "Data-driven digital marketing and SEO consultancy combining search performance, paid media, content and analytics to turn digital visibility into measurable growth.",
});

export const revalidate = 3600;

export default function EnglishHome() {
    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">
            <JsonLd data={organizationSchema("en")} />
            <JsonLd data={websiteSchema("en")} />
            <WhatsAppFloat />
            <Header locale="en" />

            <main className="isolate">
                {/* Hero Section */}
                <div className="relative pt-14">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-auryn-magenta/20 rounded-full blur-[100px] opacity-50"></div>
                        <div className="absolute top-40 -left-20 w-[30rem] h-[30rem] bg-auryn-purple/20 rounded-full blur-[100px] opacity-50"></div>
                    </div>

                    <div className="py-24 sm:py-32 lg:pb-40 relative z-10">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-4xl text-center px-4">
                                <div className="mb-8 flex justify-center">
                                    <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-300 ring-1 ring-white/10 hover:ring-auryn-magenta/50 transition-all bg-white/5 backdrop-blur-sm">
                                        Digital Marketing &amp; SEO Consultancy{" "}
                                        <Link href="/en/services" className="font-semibold text-auryn-magenta ml-2">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            Learn more <span aria-hidden="true">&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading mb-6">
                                    If There&apos;s a Search, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                                        There&apos;s a Strategy
                                    </span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-400 font-body max-w-2xl mx-auto">
                                    Auryn combines search performance, advertising, content and analytics to turn digital visibility into measurable growth.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0 h-12 px-8 text-base rounded-xl transition-transform hover:scale-105" asChild>
                                        <Link href="/en/seo-analysis">Start Free SEO Analysis</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base rounded-xl" asChild>
                                        <Link href="/en/contact">
                                            Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-auryn-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="mx-auto max-w-2xl lg:text-center relative z-10">
                        <h2 className="text-base font-semibold leading-7 text-auryn-magenta">Our Services</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">360° Approach</span> to Digital
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-400">
                            Every digital marketing solution your brand needs, under one roof.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none relative z-10">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
                            {[
                                { name: "SEO", description: "Climb search rankings and grow organic traffic that compounds.", icon: Search, href: "/en/services/seo" },
                                { name: "Google Ads", description: "Reach the right audience at the right moment and maximize conversions.", icon: TrendingUp, href: "/en/services/google-ads" },
                                { name: "Social Media Management", description: "Build brand awareness and engage your community.", icon: Globe, href: "/en/services/social-media" },
                                { name: "Content Marketing", description: "Win attention with content that's actually worth reading.", icon: PenTool, href: "/en/services/content-marketing" },
                                { name: "Meta Ads", description: "Reach prospective customers through Facebook and Instagram advertising.", icon: Megaphone, href: "/en/services/meta-ads" },
                                { name: "Analytics & Reporting", description: "Track performance with transparent, detailed reporting.", icon: BarChart2, href: "/en/services/analytics-reporting" },
                            ].map((feature) => (
                                <div key={feature.name} className="flex flex-col bg-gray-900/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-auryn-magenta/30 transition-all hover:shadow-lg hover:shadow-auryn-magenta/5 group hover:-translate-y-1">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-auryn-magenta/10 transition-colors">
                                            <feature.icon className="h-6 w-6 flex-none text-auryn-magenta group-hover:scale-110 transition-transform" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                        <p className="flex-auto">{feature.description}</p>
                                        <p className="mt-6">
                                            <Link href={feature.href} className="text-sm font-semibold leading-6 text-auryn-magenta group-hover:text-white transition-colors flex items-center">
                                                Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="bg-gray-900/30 border-y border-white/5 py-24 sm:py-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-auryn-magenta/5 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
                            <div className="lg:pr-8 lg:pt-4">
                                <div className="lg:max-w-lg">
                                    <h2 className="text-base font-semibold leading-7 text-auryn-magenta">Our Story</h2>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">What Does Auryn Mean?</p>
                                    <p className="mt-6 text-lg leading-8 text-gray-400">
                                        Auryn represents infinity and interconnection. We aim for the same for your brand in the digital world: sustainable, long-term success. By combining data with insight, we unlock your brand&apos;s potential.
                                    </p>
                                    <div className="mt-10">
                                        <Button variant="gradient" className="shadow-lg" asChild>
                                            <Link href="/en/about">Read More</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start justify-end lg:order-last">
                                <div className="relative rounded-2xl bg-gray-800/50 p-2 ring-1 ring-inset ring-white/10 lg:-m-4 lg:rounded-3xl lg:p-4 backdrop-blur-sm">
                                    <div className="aspect-[4/3] w-[400px] sm:w-[600px] rounded-xl relative overflow-hidden group">
                                        <Image
                                            src="/brand/story-infinity-en.svg"
                                            alt="Auryn Dijital - Infinity and Connection"
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/30"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-auryn-magenta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer locale="en" />
        </div>
    );
}
