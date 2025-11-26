"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const caseStudySchema = z.object({
    title: z.string().min(1, "Başlık zorunludur"),
    client: z.string().min(1, "Müşteri adı zorunludur"),
    slug: z.string().min(1, "Slug zorunludur"),
    excerpt: z.string().min(1, "Özet zorunludur"),
    content: z.string().min(1, "İçerik zorunludur"),
    coverImage: z.string().optional(),
    category: z.string().min(1, "Kategori zorunludur"),
    published: z.boolean(),
});

type CaseStudyFormData = z.infer<typeof caseStudySchema>;

interface CaseStudyFormProps {
    initialData?: any;
}

export function CaseStudyForm({ initialData }: CaseStudyFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(initialData?.coverImage || "");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CaseStudyFormData>({
        resolver: zodResolver(caseStudySchema),
        defaultValues: {
            title: initialData?.title || "",
            client: initialData?.client || "",
            slug: initialData?.slug || "",
            excerpt: initialData?.excerpt || "",
            content: initialData?.content || "",
            coverImage: initialData?.coverImage || "",
            category: initialData?.category || "",
            published: initialData?.published || false,
        },
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImagePreview(base64);
                setValue("coverImage", base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: CaseStudyFormData) => {
        setIsSubmitting(true);
        try {
            const method = initialData ? "PUT" : "POST";
            const body = initialData ? { ...data, id: initialData.id } : data;

            const res = await fetch("/api/admin/case-studies", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                router.push("/admin/case-studies");
                router.refresh();
            } else {
                alert("Bir hata oluştu");
            }
        } catch (error) {
            alert("Bir hata oluştu");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{initialData ? "Vaka Çalışması Düzenle" : "Yeni Vaka Çalışması"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Başlık</label>
                            <input
                                {...register("title")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Müşteri</label>
                            <input
                                {...register("client")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                            {errors.client && <p className="text-sm text-red-500">{errors.client.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <input
                                {...register("slug")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="ornek-vaka-calismasi"
                            />
                            {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kategori</label>
                            <select
                                {...register("category")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">Seçiniz</option>
                                <option value="SEO">SEO</option>
                                <option value="Google Ads">Google Ads</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Content Marketing">Content Marketing</option>
                            </select>
                            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Özet</label>
                        <textarea
                            {...register("excerpt")}
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">İçerik</label>
                        <textarea
                            {...register("content")}
                            rows={10}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Kapak Görseli</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        {imagePreview && (
                            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                <img src={imagePreview} alt="Preview" className="max-h-48 object-cover rounded" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            {...register("published")}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <label className="text-sm font-medium">Yayınla</label>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={isSubmitting} className="bg-auryn-magenta hover:bg-auryn-dark">
                            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            İptal
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
