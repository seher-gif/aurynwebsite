"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, Trash2, Loader2 } from "lucide-react";

interface Page {
    id: string;
    title: string;
    slug: string;
    updatedAt: string;
    published: boolean;
}

export default function AdminPagesList() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPages() {
            try {
                const res = await fetch("/api/admin/pages");
                if (res.ok) {
                    const data = await res.json();
                    setPages(data);
                }
            } catch (error) {
                console.error("Failed to fetch pages", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPages();
    }, []);

    const deletePage = async (id: string) => {
        if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/pages/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setPages(pages.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete page", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-auryn-magenta" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sayfa Yönetimi</h1>
                <Button asChild className="bg-auryn-magenta hover:bg-auryn-dark">
                    <Link href="/admin/pages/new">
                        <Plus className="mr-2 h-4 w-4" /> Yeni Sayfa
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tüm Sayfalar</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Başlık</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">URL (Slug)</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Durum</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-gray-900">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {pages.map((page) => (
                                    <tr key={page.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium text-gray-900">{page.title}</td>
                                        <td className="p-4 align-middle text-gray-700">/{page.slug}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${page.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {page.published ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/pages/${page.id}`}>
                                                        <Edit className="h-4 w-4 mr-2" /> Düzenle
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => deletePage(page.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4 mr-2" /> Sil
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {pages.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-gray-500">Henüz sayfa oluşturulmamış.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
