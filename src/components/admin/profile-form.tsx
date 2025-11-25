"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

const profileSchema = z.object({
    name: z.string().min(1, "İsim zorunludur"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, "Yeni şifre en az 6 karakter olmalıdır").optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
}).refine((data) => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Şifreler eşleşmiyor veya mevcut şifre girilmedi",
    path: ["confirmPassword"],
});

export function ProfileForm() {
    const { data: session, update } = useSession();
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
        }
    });

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                await update(updatedUser);
                setMessage({ type: "success", text: "Profil güncellendi." });
                reset({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            } else {
                const errorData = await res.json();
                setMessage({ type: "error", text: errorData.error || "Güncelleme başarısız oldu." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Bir hata oluştu." });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">İsim</label>
                        <input
                            {...register("name")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">E-posta</label>
                        <input
                            {...register("email")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium mb-4">Şifre Değiştir</h3>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Mevcut Şifre</label>
                                <input
                                    type="password"
                                    {...register("currentPassword")}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Yeni Şifre</label>
                                <input
                                    type="password"
                                    {...register("newPassword")}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Yeni Şifre (Tekrar)</label>
                                <input
                                    type="password"
                                    {...register("confirmPassword")}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                            </div>
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
