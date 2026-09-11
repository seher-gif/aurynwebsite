import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogPostView } from "@/components/blog/blog-post-view";
import { getPostBySlug } from "@/lib/blog/data";
import { pageMetadata } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug, "en");

    if (!post) {
        return { title: "Post Not Found" };
    }

    return pageMetadata({
        locale: "en",
        path: `/en/blog/${post.slug}`,
        title: post.metaTitle || post.title,
        description: post.metaDesc || post.excerpt,
        ogImage: post.coverImage || undefined,
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug, "en");

    if (!post) {
        notFound();
    }

    return (
        <>
            <JsonLd
                data={articleSchema({
                    locale: "en",
                    title: post.title,
                    description: post.metaDesc || post.excerpt,
                    path: `/en/blog/${post.slug}`,
                    image: post.coverImage,
                    datePublished: post.createdAt,
                    dateModified: post.updatedAt,
                    authorName: post.authorName,
                })}
            />
            <JsonLd data={breadcrumbSchema([
                { name: "Home", path: "/en" },
                { name: "Blog", path: "/en/blog" },
                { name: post.title, path: `/en/blog/${post.slug}` },
            ])} />
            <Header locale="en" />
            <BlogPostView post={post} locale="en" />
            <Footer locale="en" />
        </>
    );
}
