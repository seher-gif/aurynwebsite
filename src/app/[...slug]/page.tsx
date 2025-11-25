import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

// Fetch page data for metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const slugPath = slug.join("/");

    const page = await prisma.page.findUnique({
        where: { slug: slugPath },
    });

    if (!page) {
        return {
            title: "Sayfa Bulunamadı",
        };
    }

    return {
        title: page.metaTitle || page.title,
        description: page.metaDesc,
        alternates: {
            canonical: page.canonical,
        },
        openGraph: {
            title: page.ogTitle || page.metaTitle || page.title,
            description: page.ogDesc || page.metaDesc || undefined,
            images: page.ogImage ? [{ url: page.ogImage }] : undefined,
        },
        robots: {
            index: page.index ?? undefined,
            follow: page.follow ?? undefined,
        },
    };
}

export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;
    const slugPath = slug.join("/");
    const fullPath = `/${slugPath}`;

    // 1. Check for Redirects
    const redirectRule = await prisma.redirect.findFirst({
        where: {
            sourcePath: fullPath,
            active: true,
        },
    });

    if (redirectRule) {
        redirect(redirectRule.targetPath);
    }

    // 2. Check for Dynamic Page
    const page = await prisma.page.findUnique({
        where: { slug: slugPath },
    });

    if (!page || !page.published) {
        notFound();
    }

    return (
        <div className="bg-white">
            <Header />
            <main className="isolate">
                <div className="bg-white px-6 py-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">
                            {page.title}
                        </h1>
                        <div className="mt-10 max-w-2xl prose prose-lg prose-headings:font-heading">
                            {/* Render content safely - assuming simple HTML or text for now */}
                            {/* In a real app, use a markdown parser or rich text renderer */}
                            <div dangerouslySetInnerHTML={{ __html: page.content as string || "" }} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
