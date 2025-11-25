"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Log {
    id: string;
    path: string;
    referrer: string | null;
    count: number;
    lastHitAt: string;
}

export function NotFoundLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await fetch("/api/admin/404-logs");
                if (res.ok) {
                    const data = await res.json();
                    setLogs(data);
                }
            } catch (error) {
                console.error("Failed to fetch logs", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLogs();
    }, []);

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-auryn-magenta" /></div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>404 Hata Kayıtları</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">URL</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Referrer</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sayaç</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Son Erişim</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {logs.map((log) => (
                                <tr key={log.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium text-red-600">{log.path}</td>
                                    <td className="p-4 align-middle text-gray-500">{log.referrer || "-"}</td>
                                    <td className="p-4 align-middle">{log.count}</td>
                                    <td className="p-4 align-middle text-gray-500">
                                        {formatDistanceToNow(new Date(log.lastHitAt), { addSuffix: true, locale: tr })}
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">Henüz 404 hatası kaydedilmemiş.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
