"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string | null;
    coverImage: string | null;
    createdAt: string;
    author: {
        name: string;
    };
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await fetch('/api/blog');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <main className="isolate">
                <div className="relative py-24 sm:py-32">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-auryn-magenta/10 rounded-full blur-[100px] opacity-40"></div>
                        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-auryn-purple/10 rounded-full blur-[100px] opacity-40"></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                                Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">İçgörüler</span>
                            </h2>
                            <p className="mt-2 text-lg leading-8 text-gray-400">
                                Dijital pazarlama dünyasından en güncel haberler, ipuçları ve stratejiler.
                            </p>
                        </div>

                        {loading ? (
                            <div className="text-center mt-16 text-gray-400">
                                Yükleniyor...
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center mt-16 text-gray-400">
                                Henüz blog yazısı bulunmuyor.
                            </div>
                        ) : (
                            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {posts.map((post) => (
                                    <article key={post.id} className="flex flex-col items-start justify-between group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 border border-auryn-magenta/20 hover:border-auryn-magenta/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-auryn-magenta/20">
                                        <div className="relative w-full overflow-hidden rounded-xl">
                                            <img
                                                src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"}
                                                alt={post.title}
                                                className="aspect-[16/9] w-full bg-gray-900 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                                        </div>
                                        <div className="max-w-xl w-full px-2 pb-2">
                                            <div className="mt-6 flex items-center gap-x-4 text-xs">
                                                <time dateTime={post.createdAt} className="text-gray-400">
                                                    {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </time>
                                                {post.category && (
                                                    <span className="relative z-10 rounded-full bg-auryn-magenta/10 px-3 py-1.5 font-medium text-auryn-magenta hover:bg-auryn-magenta/20 border border-auryn-magenta/20 transition-colors">
                                                        {post.category}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="group relative">
                                                <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-auryn-magenta group-hover:to-auryn-purple transition-all">
                                                    <Link href={`/blog/${post.slug}`}>
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
                                                        {post.author.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="relative mt-4 flex items-center gap-x-4">
                                                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold leading-6 text-auryn-magenta flex items-center hover:text-auryn-purple transition-colors">
                                                    Devamını Oku <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
            <Footer />
        </div>
    );
}
