"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ArrowLeft, CheckCircle, Eye, EyeOff, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const inputClass =
    "w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-auryn-magenta focus:border-transparent";

function PasswordField({
    id,
    label,
    value,
    onChange,
    autoComplete,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    autoComplete: string;
}) {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoComplete={autoComplete}
                    required
                    className={inputClass}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                    aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
}

export default function SecuritySettingsPage() {
    const { data: session } = useSession();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/settings/security", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setMessage({ type: "success", text: "Şifreniz güncellendi. Bir sonraki girişte yeni şifrenizi kullanın." });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setMessage({ type: "error", text: data.error || "Şifre güncellenemedi." });
            }
        } catch {
            setMessage({ type: "error", text: "Bir hata oluştu. Lütfen tekrar deneyin." });
        } finally {
            setSaving(false);
        }
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/settings">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Geri
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Güvenlik</h1>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 max-w-5xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Şifre Değiştir</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <PasswordField id="currentPassword" label="Mevcut Şifre" value={currentPassword} onChange={setCurrentPassword} autoComplete="current-password" />
                            <PasswordField id="newPassword" label="Yeni Şifre" value={newPassword} onChange={setNewPassword} autoComplete="new-password" />
                            <PasswordField id="confirmPassword" label="Yeni Şifre (Tekrar)" value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" />

                            {message && (
                                <p
                                    role="status"
                                    className={`text-sm rounded-lg px-3 py-2 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                                >
                                    {message.text}
                                </p>
                            )}

                            <Button type="submit" disabled={saving}>
                                {saving ? "Kaydediliyor..." : "Şifreyi Güncelle"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-auryn-magenta" />
                                Parola Politikası
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {[
                                    "En az 10 karakter",
                                    "En az bir harf ve bir rakam",
                                    "Mevcut şifreden farklı olmalı",
                                    "Şifreler güvenli biçimde (bcrypt) saklanır",
                                ].map((rule) => (
                                    <li key={rule} className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Oturum</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-700">
                            <p>
                                Giriş yapan hesap: <strong>{session?.user?.email ?? "-"}</strong>
                            </p>
                            <p>
                                Aynı e-posta ile 5 hatalı girişten sonra giriş 15 dakika süreyle kilitlenir.
                            </p>
                            <Button variant="outline" onClick={() => signOut({ callbackUrl: "/login" })}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Oturumu Kapat
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
