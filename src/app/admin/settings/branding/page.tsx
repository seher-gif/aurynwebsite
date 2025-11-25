"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BrandingSettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/admin/settings/branding', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Ayarlar kaydedildi!');
                router.refresh();
            } else {
                alert('Ayarlar kaydedilemedi');
            }
        } catch (error) {
            alert('Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/settings">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Marka & Görünüm Ayarları
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                {/* Logo & Favicon */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-900">Logo & Favicon</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="logoUrl" className="text-gray-900">Logo URL</Label>
                            <Input
                                id="logoUrl"
                                name="logoUrl"
                                type="url"
                                placeholder="https://example.com/logo.png"
                                className="mt-2 text-gray-900"
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                Logo görselinizin URL'sini girin (önerilen: 200x50px)
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="faviconUrl" className="text-gray-900">Favicon URL</Label>
                            <Input
                                id="faviconUrl"
                                name="faviconUrl"
                                type="url"
                                placeholder="https://example.com/favicon.ico"
                                className="mt-2 text-gray-900"
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                Favicon görselinizin URL'sini girin (önerilen: 32x32px, .ico formatı)
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Hero Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-900">Ana Sayfa Hero Bölümü</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="heroHeadline" className="text-gray-900">Başlık</Label>
                            <Input
                                id="heroHeadline"
                                name="heroHeadline"
                                placeholder="Dijital Dünyada Markanızı Zirveye Taşıyın"
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="heroSubheadline" className="text-gray-900">Alt Başlık</Label>
                            <Textarea
                                id="heroSubheadline"
                                name="heroSubheadline"
                                placeholder="Veri odaklı SEO, Google Ads ve sosyal medya stratejileriyle işletmenizin büyüme potansiyelini açığa çıkarıyoruz."
                                rows={3}
                                className="mt-2 text-gray-900"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="heroPrimaryLabel" className="text-gray-900">Birincil Buton Yazısı</Label>
                                <Input
                                    id="heroPrimaryLabel"
                                    name="heroPrimaryLabel"
                                    placeholder="Hemen Başlayın"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                            <div>
                                <Label htmlFor="heroPrimaryUrl" className="text-gray-900">Birincil Buton URL</Label>
                                <Input
                                    id="heroPrimaryUrl"
                                    name="heroPrimaryUrl"
                                    placeholder="/iletisim"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="heroSecondaryLabel" className="text-gray-900">İkincil Buton Yazısı</Label>
                                <Input
                                    id="heroSecondaryLabel"
                                    name="heroSecondaryLabel"
                                    placeholder="Hizmetlerimiz"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                            <div>
                                <Label htmlFor="heroSecondaryUrl" className="text-gray-900">İkincil Buton URL</Label>
                                <Input
                                    id="heroSecondaryUrl"
                                    name="heroSecondaryUrl"
                                    placeholder="/hizmetler"
                                    className="mt-2 text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="heroBadge" className="text-gray-900">Badge Metni (Opsiyonel)</Label>
                            <Input
                                id="heroBadge"
                                name="heroBadge"
                                placeholder="Yeni: 2024 SEO Stratejileri"
                                className="mt-2 text-gray-900"
                            />
                        </div>
                    </CardContent>
                </Card>

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
        </div>
    );
}
