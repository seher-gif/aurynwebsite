"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/admin/blog', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                router.push('/admin/blog');
            } else {
                alert('Blog yazısı kaydedilemedi');
            }
        } catch (error) {
            alert('Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Yeni Blog Yazısı
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
                                placeholder="Blog yazınızın içeriğini buraya yazın..."
                                rows={15}
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="metaTitle" className="text-gray-900">SEO Başlığı</Label>
                                <Input
                                    id="metaTitle"
                                    name="metaTitle"
                                    placeholder="SEO için meta başlık"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                            <div>
                                <Label htmlFor="metaDescription" className="text-gray-900">SEO Açıklaması</Label>
                                <Input
                                    id="metaDescription"
                                    name="metaDescription"
                                    placeholder="SEO için meta açıklama"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                className="bg-auryn-magenta hover:bg-auryn-dark"
                                disabled={loading}
                            >
                                {loading ? "Kaydediliyor..." : "Yayınla"}
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
