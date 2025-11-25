"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMarketingTool } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewToolPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createMarketingTool(formData);

        if (result.success) {
            router.push("/admin/tools");
        } else {
            alert("Hata: " + result.error);
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Yeni Dijital Araç Ekle
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle className="text-gray-900">Araç Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name" className="text-gray-900">Araç Adı</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                placeholder="Örn: Google Analytics"
                                className="mt-2"
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                Bu araç için tanımlayıcı bir isim girin
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="type" className="text-gray-900">Araç Tipi</Label>
                            <Input
                                id="type"
                                name="type"
                                required
                                placeholder="Örn: ANALYTICS, ADS, SOCIAL"
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label htmlFor="headerCode" className="text-gray-900">Header Kodu (Head)</Label>
                            <Textarea
                                id="headerCode"
                                name="headerCode"
                                placeholder="Buraya eklenecek kod otomatik olarak <head> bölümüne yerleştirilecektir"
                                rows={4}
                                className="mt-2 font-mono text-sm"
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                Google Analytics, Facebook Pixel gibi kodlar için
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="bodyCode" className="text-gray-900">Body Kodu (Body Açılış)</Label>
                            <Textarea
                                id="bodyCode"
                                name="bodyCode"
                                placeholder="Buraya eklenecek kod otomatik olarak <body> açılışına yerleştirilecektir"
                                rows={4}
                                className="mt-2 font-mono text-sm"
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                Google Tag Manager gibi kodlar için
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="footerCode" className="text-gray-900">Footer Kodu (Body Kapanış)</Label>
                            <Textarea
                                id="footerCode"
                                name="footerCode"
                                placeholder="Buraya eklenecek kod otomatik olarak </body> kapanışından önce yerleştirilecektir"
                                rows={4}
                                className="mt-2 font-mono text-sm"
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                Performans için sayfanın en altına yerleştirilmesi gereken kodlar için
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                className="bg-auryn-magenta hover:bg-auryn-dark"
                                disabled={loading}
                            >
                                {loading ? "Kaydediliyor..." : "Kaydet"}
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
