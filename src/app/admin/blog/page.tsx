"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    published: boolean;
    createdAt: string;
    author: {
        name: string;
        email: string;
    };
}

export default function BlogManagementPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await fetch('/api/admin/blog');
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

    async function handleDelete(id: string) {
        if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/blog/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPosts(posts.filter(post => post.id !== id));
            } else {
                alert('Blog yazısı silinemedi');
            }
        } catch (error) {
            alert('Bir hata oluştu');
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Blog Yönetimi
                </h1>
                <Button className="bg-auryn-magenta hover:bg-auryn-dark" asChild>
                    <Link href="/admin/blog/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Blog Yazısı
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-gray-900">Blog Yazıları</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-sm text-gray-600">Yükleniyor...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-sm text-gray-800">
                            Henüz blog yazısı bulunmuyor. "Yeni Blog Yazısı" butonuna tıklayarak ilk yazınızı oluşturabilirsiniz.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-auryn-magenta transition-colors"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{post.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                            <span>Yazar: {post.author.name}</span>
                                            <span>•</span>
                                            <span>{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
                                            <span>•</span>
                                            <span className={post.published ? "text-green-600" : "text-gray-400"}>
                                                {post.published ? "Yayında" : "Taslak"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={`/admin/blog/${post.id}`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
