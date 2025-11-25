"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const heroSchema = z.object({
    headline: z.string().min(1, "Başlık zorunludur"),
    subheadline: z.string().optional(),
    ctaPrimaryLabel: z.string().optional(),
    ctaPrimaryUrl: z.string().optional(),
    ctaSecondaryLabel: z.string().optional(),
    ctaSecondaryUrl: z.string().optional(),
    badgeText: z.string().optional(),
    backgroundStyle: z.string().optional(),
});

export function HomepageHeroForm() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof heroSchema>>({
        resolver: zodResolver(heroSchema),
    });

    useEffect(() => {
        async function fetchHero() {
            try {
                const res = await fetch("/api/admin/homepage-hero");
                const data = await res.json();
                if (res.ok) {
                    reset(data);
                }
            } catch (error) {
                console.error("Failed to fetch hero data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHero();
    }, [reset]);

    const onSubmit = async (data: z.infer<typeof heroSchema>) => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/homepage-hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Anasayfa banner güncellendi." });
            } else {
                setMessage({ type: "error", text: "Güncelleme başarısız oldu." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Bir hata oluştu." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-auryn-magenta" /></div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Anasayfa Banner Ayarları</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ana Başlık (H1)</label>
                            <input
                                {...register("headline")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.headline && <p className="text-sm text-red-500">{errors.headline.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Alt Başlık</label>
                            <input
                                {...register("subheadline")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Birincil Buton Metni</label>
                            <input
                                {...register("ctaPrimaryLabel")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Birincil Buton URL</label>
                            <input
                                {...register("ctaPrimaryUrl")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">İkincil Buton Metni</label>
                            <input
                                {...register("ctaSecondaryLabel")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">İkincil Buton URL</label>
                            <input
                                {...register("ctaSecondaryUrl")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Üst Rozet Metni</label>
                            <input
                                {...register("badgeText")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Arkaplan Stili</label>
                            <select
                                {...register("backgroundStyle")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="animated-gradient">Animasyonlu Gradyan</option>
                                <option value="static-gradient">Statik Gradyan</option>
                                <option value="solid">Düz Renk</option>
                            </select>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <Button type="submit" disabled={saving} className="bg-auryn-magenta hover:bg-auryn-dark">
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
