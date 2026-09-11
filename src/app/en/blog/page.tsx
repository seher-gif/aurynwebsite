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
    locale: "en",
    path: "/en/blog",
    title: "Blog & Insights",
    description: "Articles, tips and case studies on SEO, Google Ads, social media and digital marketing strategy.",
});

export default async function BlogPage() {
    const posts = await getPublishedPosts("en");

    return (
        <>
            <JsonLd data={breadcrumbSchema([
                { name: "Home", path: "/en" },
                { name: "Blog", path: "/en/blog" },
            ])} />
            <Header locale="en" />
            <BlogList posts={posts} locale="en" />
            <Footer locale="en" />
        </>
    );
}
