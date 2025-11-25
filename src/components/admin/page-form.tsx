"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const pageSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur"),
    slug: z.string().min(1, "Slug zorunludur").regex(/^[a-z0-9-]+$/, "Slug sadece küçük harf, rakam ve tire içerebilir"),
    metaTitle: z.string().optional(),
    metaDesc: z.string().optional(),
    canonical: z.string().optional(),
    index: z.boolean().optional(),
    follow: z.boolean().optional(),
    ogTitle: z.string().optional(),
    ogDesc: z.string().optional(),
    ogImage: z.string().optional(),
    published: z.boolean().optional(),
});

interface PageFormProps {
    pageId?: string;
}

export function PageForm({ pageId }: PageFormProps) {
    const [loading, setLoading] = useState(!!pageId);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof pageSchema>>({
        resolver: zodResolver(pageSchema),
        defaultValues: {
            index: true,
            follow: true,
            published: false,
        }
    });

    useEffect(() => {
        if (!pageId) return;

        async function fetchPage() {
            try {
                const res = await fetch(`/api/admin/pages/${pageId}`);
                if (res.ok) {
                    const data = await res.json();
                    reset(data);
                } else {
                    setError("Sayfa bulunamadı.");
                }
            } catch (error) {
                console.error("Failed to fetch page", error);
                setError("Sayfa yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        }
        fetchPage();
    }, [pageId, reset]);

    const onSubmit = async (data: z.infer<typeof pageSchema>) => {
        setSaving(true);
        setError(null);
        try {
            const url = pageId ? `/api/admin/pages/${pageId}` : "/api/admin/pages";
            const method = pageId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/pages");
                router.refresh();
            } else {
                const errorData = await res.json();
                setError(errorData.error || "Kaydetme başarısız oldu.");
            }
        } catch (error) {
            setError("Bir hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-auryn-magenta" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/pages">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    {pageId ? "Sayfayı Düzenle" : "Yeni Sayfa Oluştur"}
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Genel Bilgiler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Sayfa Başlığı</label>
                                    <input
                                        {...register("title")}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">URL (Slug)</label>
                                    <div className="flex items-center">
                                        <span className="bg-gray-100 border border-r-0 border-input rounded-l-md px-3 py-2 text-sm text-gray-500">
                                            /
                                        </span>
                                        <input
                                            {...register("slug")}
                                            className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                    {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Ayarları</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Meta Başlık (Title)</label>
                                    <input
                                        {...register("metaTitle")}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Meta Açıklama (Description)</label>
                                    <textarea
                                        {...register("metaDesc")}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Canonical URL</label>
                                    <input
                                        {...register("canonical")}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            {...register("index")}
                                            id="index"
                                            className="h-4 w-4 rounded border-gray-300 text-auryn-magenta focus:ring-auryn-magenta"
                                        />
                                        <label htmlFor="index" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Index (Arama motorları dizine eklesin)
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            {...register("follow")}
                                            id="follow"
                                            className="h-4 w-4 rounded border-gray-300 text-auryn-magenta focus:ring-auryn-magenta"
                                        />
                                        <label htmlFor="follow" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Follow (Linkleri takip etsin)
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sosyal Medya (Open Graph)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">OG Başlık</label>
                                    <input
                                        {...register("ogTitle")}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">OG Açıklama</label>
                                    <textarea
                                        {...register("ogDesc")}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">OG Görsel URL</label>
                                    <input
                                        {...register("ogImage")}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Yayınlama</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        {...register("published")}
                                        id="published"
                                        className="h-4 w-4 rounded border-gray-300 text-auryn-magenta focus:ring-auryn-magenta"
                                    />
                                    <label htmlFor="published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Yayında
                                    </label>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" disabled={saving} className="w-full bg-auryn-magenta hover:bg-auryn-dark">
                                    {saving ? "Kaydediliyor..." : "Kaydet"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
