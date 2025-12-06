"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    coverImage: string | null;
    category: string | null;
    metaTitle: string | null;
    metaDesc: string | null;
    published: boolean;
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        fetchPost();
    }, []);

    async function fetchPost() {
        try {
            const response = await fetch(`/api/admin/blog/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setPost(data);
            } else {
                alert('Blog yazısı bulunamadı');
                router.push('/admin/blog');
            }
        } catch (error) {
            console.error('Failed to fetch post:', error);
            alert('Bir hata oluştu');
        } finally {
            setFetching(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch(`/api/admin/blog/${params.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                router.push('/admin/blog');
            } else {
                alert('Blog yazısı güncellenemedi');
            }
        } catch (error) {
            alert('Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Yükleniyor...</div>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Blog Yazısını Düzenle
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle className="text-gray-900">Blog İçeriği</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="title" className="text-gray-900">Yazı Başlığı</Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                defaultValue={post.title}
                                placeholder="Blog yazınızın başlığını girin"
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="slug" className="text-gray-900">URL Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                required
                                defaultValue={post.slug}
                                placeholder="ornek-blog-yazisi"
                                className="mt-2 text-gray-900"
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                URL'de görünecek kısım (türkçe karakter kullanmayın)
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="excerpt" className="text-gray-900">Özet</Label>
                            <Textarea
                                id="excerpt"
                                name="excerpt"
                                defaultValue={post.excerpt || ''}
                                placeholder="Yazının kısa özeti"
                                rows={3}
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="content" className="text-gray-900">İçerik</Label>
                            <Textarea
                                id="content"
                                name="content"
                                required
                                defaultValue={post.content || ''}
                                placeholder="Blog yazınızın içeriğini buraya yazın..."
                                rows={15}
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="coverImage" className="text-gray-900">Kapak Görseli URL</Label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                defaultValue={post.coverImage || ''}
                                placeholder="https://..."
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="category" className="text-gray-900">Kategori</Label>
                            <Input
                                id="category"
                                name="category"
                                defaultValue={post.category || ''}
                                placeholder="SEO, Dijital Pazarlama, vb."
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="metaTitle" className="text-gray-900">SEO Başlığı</Label>
                                <Input
                                    id="metaTitle"
                                    name="metaTitle"
                                    defaultValue={post.metaTitle || ''}
                                    placeholder="SEO için meta başlık"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                            <div>
                                <Label htmlFor="metaDesc" className="text-gray-900">SEO Açıklaması</Label>
                                <Input
                                    id="metaDesc"
                                    name="metaDesc"
                                    defaultValue={post.metaDesc || ''}
                                    placeholder="SEO için meta açıklama"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="published"
                                name="published"
                                defaultChecked={post.published}
                            />
                            <Label
                                htmlFor="published"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 cursor-pointer"
                            >
                                Yayınla (aktif olursa blog yazısı sitede görünür)
                            </Label>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                className="bg-auryn-magenta hover:bg-auryn-dark"
                                disabled={loading}
                            >
                                {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={loading}
                            >
                                İptal
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
