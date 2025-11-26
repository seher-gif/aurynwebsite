"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const clientSchema = z.object({
    name: z.string().min(1, "Müşteri adı zorunludur"),
    logo: z.string().min(1, "Logo zorunludur"),
    website: z.string().url("Geçerli bir URL giriniz").optional().or(z.literal("")),
    order: z.number().int().min(0),
    active: z.boolean(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
    initialData?: any;
}

export function ClientForm({ initialData }: ClientFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoPreview, setLogoPreview] = useState(initialData?.logo || "");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: initialData?.name || "",
            logo: initialData?.logo || "",
            website: initialData?.website || "",
            order: initialData?.order || 0,
            active: initialData?.active !== undefined ? initialData.active : true,
        },
    });

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setLogoPreview(base64);
                setValue("logo", base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: ClientFormData) => {
        setIsSubmitting(true);
        try {
            const method = initialData ? "PUT" : "POST";
            const body = initialData ? { ...data, id: initialData.id } : data;

            const res = await fetch("/api/admin/clients", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                router.push("/admin/clients");
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
                <CardTitle>{initialData ? "Müşteri Düzenle" : "Yeni Müşteri Ekle"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Müşteri Adı</label>
                        <input
                            {...register("name")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Örnek: Acme Corp"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        {logoPreview && (
                            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                <img src={logoPreview} alt="Preview" className="max-h-24 object-contain" />
                            </div>
                        )}
                        {errors.logo && <p className="text-sm text-red-500">{errors.logo.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Website (Opsiyonel)</label>
                        <input
                            {...register("website")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="https://example.com"
                        />
                        {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sıra</label>
                        <input
                            type="number"
                            {...register("order", { valueAsNumber: true })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        {errors.order && <p className="text-sm text-red-500">{errors.order.message}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            {...register("active")}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <label className="text-sm font-medium">Aktif</label>
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
