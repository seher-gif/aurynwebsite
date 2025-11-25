"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Redirect {
    id: string;
    sourcePath: string;
    targetPath: string;
    type: number;
    active: boolean;
}

const redirectSchema = z.object({
    sourcePath: z.string().min(1, "Kaynak URL zorunludur").startsWith("/", "URL / ile başlamalıdır"),
    targetPath: z.string().min(1, "Hedef URL zorunludur").startsWith("/", "URL / ile başlamalıdır"),
    type: z.number().int().refine((val) => [301, 302].includes(val), "Geçersiz yönlendirme tipi"),
});

export function RedirectsList() {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof redirectSchema>>({
        resolver: zodResolver(redirectSchema),
        defaultValues: {
            type: 301,
        }
    });

    useEffect(() => {
        fetchRedirects();
    }, []);

    async function fetchRedirects() {
        try {
            const res = await fetch("/api/admin/redirects");
            if (res.ok) {
                const data = await res.json();
                setRedirects(data);
            }
        } catch (error) {
            console.error("Failed to fetch redirects", error);
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = async (data: z.infer<typeof redirectSchema>) => {
        try {
            const res = await fetch("/api/admin/redirects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setOpen(false);
                reset();
                fetchRedirects();
            }
        } catch (error) {
            console.error("Failed to create redirect", error);
        }
    };

    const deleteRedirect = async (id: string) => {
        if (!confirm("Bu yönlendirmeyi silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/redirects/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setRedirects(redirects.filter((r) => r.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete redirect", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-auryn-magenta" /></div>;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Yönlendirmeler</CardTitle>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-auryn-magenta hover:bg-auryn-dark">
                            <Plus className="mr-2 h-4 w-4" /> Yeni Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Yeni Yönlendirme Ekle</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Kaynak URL (Eski)</label>
                                <input
                                    {...register("sourcePath")}
                                    placeholder="/eski-sayfa"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {errors.sourcePath && <p className="text-sm text-red-500">{errors.sourcePath.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Hedef URL (Yeni)</label>
                                <input
                                    {...register("targetPath")}
                                    placeholder="/yeni-sayfa"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {errors.targetPath && <p className="text-sm text-red-500">{errors.targetPath.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Yönlendirme Tipi</label>
                                <select
                                    {...register("type")}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="301">301 (Kalıcı)</option>
                                    <option value="302">302 (Geçici)</option>
                                </select>
                            </div>
                            <Button type="submit" className="w-full bg-auryn-magenta hover:bg-auryn-dark">Ekle</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Kaynak</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Hedef</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tip</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {redirects.map((redirect) => (
                                <tr key={redirect.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{redirect.sourcePath}</td>
                                    <td className="p-4 align-middle text-gray-500">{redirect.targetPath}</td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            {redirect.type}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <Button variant="ghost" size="icon" onClick={() => deleteRedirect(redirect.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {redirects.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">Henüz yönlendirme eklenmemiş.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
