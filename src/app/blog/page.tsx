import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogList } from "@/components/blog/blog-list";
import { getPublishedPosts } from "@/lib/blog/data";
import { pageMetadata } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
    locale: "tr",
    path: "/blog",
    title: "Blog & İçgörüler",
    description: "SEO, Google Ads, sosyal medya ve dijital pazarlama stratejileri üzerine güncel yazılar, ipuçları ve vaka analizleri.",
});

export default async function BlogPage() {
    const posts = await getPublishedPosts("tr");

    return (
        <>
            <JsonLd data={breadcrumbSchema([
                { name: "Anasayfa", path: "/" },
                { name: "Blog", path: "/blog" },
            ])} />
            <Header />
            <BlogList posts={posts} locale="tr" />
            <Footer />
        </>
    );
}
