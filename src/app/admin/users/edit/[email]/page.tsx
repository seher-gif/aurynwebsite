"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { updateUserPassword } from "@/lib/actions";

export default function EditUserPage({ params }: { params: { email: string } }) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, dispatch] = useActionState(updateUserPassword, undefined);
    const decodedEmail = decodeURIComponent(params.email);

    useEffect(() => {
        if (message === null) {
            // Success - redirect after 1 second
            setTimeout(() => {
                router.push('/admin/users');
            }, 1000);
        }
    }, [message, router]);

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/users">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Geri Dön
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Kullanıcı Düzenle
                </h1>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Hesap Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={dispatch} className="space-y-6">
                        <input type="hidden" name="email" value={decodedEmail} />

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                E-posta Adresi
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    value={decodedEmail}
                                    disabled
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm sm:leading-6 cursor-not-allowed"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-600">E-posta adresi değiştirilemez</p>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Yeni Şifre
                            </label>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={8}
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 pr-10"
                                    placeholder="Yeni şifre girin"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-600">En az 8 karakter olmalıdır</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Şifre Onayı
                            </label>
                            <div className="mt-2 relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    required
                                    minLength={8}
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 pr-10"
                                    placeholder="Şifrenizi tekrar girin"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirm ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {message && (
                            <div
                                className={`p-4 rounded-md ${
                                    message === null
                                        ? 'bg-green-50 text-green-800'
                                        : message.includes('başarı')
                                        ? 'bg-green-50 text-green-800'
                                        : 'bg-red-50 text-red-800'
                                }`}
                            >
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <UpdateButton />
                            <Link href="/admin/users">
                                <Button variant="outline" type="button">
                                    İptal Et
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

function UpdateButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="bg-auryn-magenta hover:bg-auryn-dark"
        >
            {pending ? "Güncelleniyor..." : "Şifreyi Güncelle"}
        </Button>
    );
}
