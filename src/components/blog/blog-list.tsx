import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { LocalizedPost } from "@/lib/blog/data";
import type { Locale } from "@/lib/i18n/routes";

const STRINGS = {
    tr: {
        eyebrow: "Blog",
        heading: "İçgörüler",
        subheading: "Dijital pazarlama dünyasından en güncel haberler, ipuçları ve stratejiler.",
        empty: "Henüz blog yazısı bulunmuyor.",
        readMore: "Devamını Oku",
        dateLocale: "tr-TR",
        blogHref: (slug: string) => `/blog/${slug}`,
    },
    en: {
        eyebrow: "Blog",
        heading: "Insights",
        subheading: "Latest news, tips and strategies from the world of digital marketing.",
        empty: "No blog posts yet.",
        readMore: "Read More",
        dateLocale: "en-US",
        blogHref: (slug: string) => `/en/blog/${slug}`,
    },
};

export function BlogList({ posts, locale }: { posts: LocalizedPost[]; locale: Locale }) {
    const t = STRINGS[locale];
    const DEFAULT_COVER = "/blog-covers/default.svg";

    return (
        <div className="bg-black min-h-screen text-white">
            <main className="isolate">
                <div className="relative py-24 sm:py-32">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-auryn-magenta/10 rounded-full blur-[100px] opacity-40"></div>
                        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-auryn-purple/10 rounded-full blur-[100px] opacity-40"></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                                {t.eyebrow} & <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">{t.heading}</span>
                            </h1>
                            <p className="mt-2 text-lg leading-8 text-gray-400">{t.subheading}</p>
                        </div>

                        {posts.length === 0 ? (
                            <div className="text-center mt-16 text-gray-400">{t.empty}</div>
                        ) : (
                            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {posts.map((post) => (
                                    <article key={post.id} className="flex flex-col items-start justify-between group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 border border-auryn-magenta/20 hover:border-auryn-magenta/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-auryn-magenta/20">
                                        <div className="relative w-full overflow-hidden rounded-xl">
                                            <Image
                                                src={post.coverImage || DEFAULT_COVER}
                                                alt={post.title}
                                                width={800}
                                                height={600}
                                                className="aspect-[16/9] w-full bg-gray-900 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                                        </div>
                                        <div className="max-w-xl w-full px-2 pb-2">
                                            <div className="mt-6 flex items-center gap-x-4 text-xs">
                                                <time dateTime={post.createdAt.toISOString()} className="text-gray-400">
                                                    {post.createdAt.toLocaleDateString(t.dateLocale, { day: "numeric", month: "long", year: "numeric" })}
                                                </time>
                                                {post.category && (
                                                    <span className="relative z-10 rounded-full bg-auryn-magenta/10 px-3 py-1.5 font-medium text-auryn-magenta hover:bg-auryn-magenta/20 border border-auryn-magenta/20 transition-colors">
                                                        {post.category}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="group relative">
                                                <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-auryn-magenta group-hover:to-auryn-purple transition-all">
                                                    <Link href={t.blogHref(post.slug)}>
                                                        <span className="absolute inset-0" />
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">{post.excerpt}</p>
                                            </div>
                                            <div className="relative mt-6 flex items-center gap-x-4">
                                                <div className="text-sm leading-6">
                                                    <p className="font-semibold text-gray-400">
                                                        <span className="absolute inset-0" />
                                                        {post.authorName}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="relative mt-4 flex items-center gap-x-4">
                                                <Link href={t.blogHref(post.slug)} className="text-sm font-semibold leading-6 text-auryn-magenta flex items-center hover:text-auryn-purple transition-colors">
                                                    {t.readMore} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
