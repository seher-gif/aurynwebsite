import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { LocalizedPost } from "@/lib/blog/data";
import type { Locale } from "@/lib/i18n/routes";
import { sanitizeRichText } from "@/lib/security/sanitize-html";

const STRINGS = {
    tr: {
        back: "Blog'a Dön",
        blogHref: "/blog",
        dateLocale: "tr-TR",
    },
    en: {
        back: "Back to Blog",
        blogHref: "/en/blog",
        dateLocale: "en-US",
    },
};

const DEFAULT_COVER = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80";

export function BlogPostView({ post, locale }: { post: LocalizedPost; locale: Locale }) {
    const t = STRINGS[locale];

    return (
        <div className="bg-black min-h-screen">
            <main className="isolate">
                <div className="bg-black px-6 py-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-300">
                        <Link href={t.blogHref} className="flex items-center text-sm font-semibold text-auryn-magenta mb-8 hover:text-auryn-purple transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> {t.back}
                        </Link>
                        {post.category && (
                            <p className="text-base font-semibold leading-7 text-auryn-magenta">{post.category}</p>
                        )}
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">{post.title}</h1>
                        <div className="mt-6 flex items-center gap-x-3 text-sm text-gray-400">
                            <time dateTime={post.createdAt.toISOString()}>
                                {post.createdAt.toLocaleDateString(t.dateLocale, { day: "numeric", month: "long", year: "numeric" })}
                            </time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{post.authorName}</span>
                        </div>

                        <figure className="mt-10">
                            <Image
                                className="aspect-video rounded-xl bg-gray-900 object-cover ring-1 ring-white/10"
                                src={post.coverImage || DEFAULT_COVER}
                                alt={post.title}
                                width={1200}
                                height={675}
                                priority
                            />
                        </figure>

                        <div
                            className="mt-10 max-w-2xl prose prose-lg prose-invert prose-headings:font-heading prose-headings:text-white prose-p:text-gray-300 prose-a:text-auryn-magenta hover:prose-a:text-auryn-purple"
                            dangerouslySetInnerHTML={{ __html: sanitizeRichText(post.content) }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
