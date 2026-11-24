"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

type Feedback = { type: "success" | "error"; text: string } | null;

export default function NotificationSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [testing, setTesting] = useState(false);
    const [emailConfigured, setEmailConfigured] = useState(true);
    const [contactEnabled, setContactEnabled] = useState(true);
    const [contactEmail, setContactEmail] = useState("");
    const [feedback, setFeedback] = useState<Feedback>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/admin/settings/notifications");
                if (res.ok) {
                    const data = await res.json();
                    setContactEnabled(Boolean(data.contactEnabled));
                    setContactEmail(data.contactEmail || "");
                    setEmailConfigured(Boolean(data.emailConfigured));
                }
            } catch (error) {
                console.error("Failed to load notification settings:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function handleSave() {
        setSaving(true);
        setFeedback(null);
        try {
            const res = await fetch("/api/admin/settings/notifications", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contactEnabled, contactEmail }),
            });
            const data = await res.json().catch(() => ({}));
            setFeedback(
                res.ok
                    ? { type: "success", text: "Bildirim ayarları kaydedildi." }
                    : { type: "error", text: data.error || "Ayarlar kaydedilemedi." }
            );
        } catch {
            setFeedback({ type: "error", text: "Bir hata oluştu. Lütfen tekrar deneyin." });
        } finally {
            setSaving(false);
        }
    }

    async function handleTest() {
        setTesting(true);
        setFeedback(null);
        try {
            const res = await fetch("/api/admin/settings/notifications", { method: "POST" });
            const data = await res.json().catch(() => ({}));
            setFeedback(
                res.ok
                    ? { type: "success", text: `Test e-postası ${data.to} adresine gönderildi. Gelen kutunuzu (ve spam klasörünü) kontrol edin.` }
                    : { type: "error", text: data.error || "Test e-postası gönderilemedi." }
            );
        } catch {
            setFeedback({ type: "error", text: "Bir hata oluştu. Lütfen tekrar deneyin." });
        } finally {
            setTesting(false);
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-gray-500">Yükleniyor...</div>;
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
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bildirimler</h1>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                </Button>
            </div>

            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>İletişim Formu Bildirimleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!emailConfigured && (
                        <p className="text-sm rounded-lg bg-amber-50 text-amber-800 px-3 py-2">
                            E-posta servisi (Resend) yapılandırılmamış olduğu için şu an e-posta gönderilemiyor. Mesajlar yine de panelde &quot;Mesajlar&quot; bölümünde saklanır.
                        </p>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={contactEnabled}
                            onChange={(e) => setContactEnabled(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-auryn-magenta focus:ring-auryn-magenta"
                        />
                        <span>
                            <span className="block text-sm font-medium text-gray-900">Yeni mesaj geldiğinde e-posta gönder</span>
                            <span className="block text-sm text-gray-500">
                                Sitedeki iletişim formundan gelen her mesaj, aşağıdaki adrese iletilir.
                            </span>
                        </span>
                    </label>

                    <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                            Bildirim E-posta Adresi
                        </label>
                        <input
                            id="contactEmail"
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="seher@auryndijital.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-auryn-magenta focus:border-transparent"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Gönderen adres no-reply@auryndijital.com olur; yanıtla dediğinizde mesajı gönderen kişiye yanıt gider.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button type="button" variant="outline" onClick={handleTest} disabled={testing || !emailConfigured}>
                            <Send className="h-4 w-4 mr-2" />
                            {testing ? "Gönderiliyor..." : "Test E-postası Gönder"}
                        </Button>
                        <span className="text-sm text-gray-500">Önce &quot;Kaydet&quot;e basın, test kayıtlı adrese gider.</span>
                    </div>

                    {feedback && (
                        <p
                            role="status"
                            className={`text-sm rounded-lg px-3 py-2 ${feedback.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                        >
                            {feedback.text}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
