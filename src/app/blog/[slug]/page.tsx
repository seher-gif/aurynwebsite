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
    const post = await getPostBySlug(slug, "tr");

    if (!post) {
        return { title: "Yazı Bulunamadı" };
    }

    return pageMetadata({
        locale: "tr",
        path: `/blog/${post.slug}`,
        title: post.metaTitle || `${post.title}`,
        description: post.metaDesc || post.excerpt,
        ogImage: post.coverImage || undefined,
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug, "tr");

    if (!post) {
        notFound();
    }

    return (
        <>
            <JsonLd
                data={articleSchema({
                    locale: "tr",
                    title: post.title,
                    description: post.metaDesc || post.excerpt,
                    path: `/blog/${post.slug}`,
                    image: post.coverImage,
                    datePublished: post.createdAt,
                    dateModified: post.updatedAt,
                    authorName: post.authorName,
                })}
            />
            <JsonLd data={breadcrumbSchema([
                { name: "Anasayfa", path: "/" },
                { name: "Blog", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
            ])} />
            <Header />
            <BlogPostView post={post} locale="tr" />
            <Footer />
        </>
    );
}
