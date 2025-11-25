"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GeneralSettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        siteTitle: "",
        siteDescription: "",
        siteUrl: "",
        contactEmail: "",
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/settings/general');
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        setSaving(true);
        try {
            const response = await fetch('/api/admin/settings/general', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                alert('Ayarlar başarıyla kaydedildi!');
            } else {
                alert('Ayarlar kaydedilemedi. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/settings">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Geri
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Genel Ayarlar
                    </h1>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Site Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-2">
                            Site Başlığı
                        </label>
                        <input
                            type="text"
                            id="siteTitle"
                            value={settings.siteTitle}
                            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-auryn-magenta focus:border-transparent"
                            placeholder="Auryn Dijital"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Bu başlık, tarayıcı sekmelerinde ve SEO için kullanılır.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-2">
                            Site Açıklaması
                        </label>
                        <textarea
                            id="siteDescription"
                            value={settings.siteDescription}
                            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-auryn-magenta focus:border-transparent resize-none"
                            placeholder="Veri odaklı dijital pazarlama ve SEO hizmetleri"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Arama motorları için site açıklaması.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            Site URL
                        </label>
                        <input
                            type="url"
                            id="siteUrl"
                            value={settings.siteUrl}
                            onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-auryn-magenta focus:border-transparent"
                            placeholder="https://auryndijital.com"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Canonical URL'ler ve sosyal medya paylaşımları için kullanılır.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                            İletişim E-posta
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            value={settings.contactEmail}
                            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-auryn-magenta focus:border-transparent"
                            placeholder="info@auryndijital.com"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Form gönderimlerinin iletileceği e-posta adresi.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
