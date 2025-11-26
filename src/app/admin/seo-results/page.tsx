import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Calendar, Eye } from "lucide-react";
import Link from "next/link";

export default async function SEOResultsPage() {
    const analyses = await prisma.seoAnalysis.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    SEO Analiz Sonuçları
                </h1>
            </div>

            {analyses.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center text-gray-600">
                            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">Henüz analiz sonucu yok</p>
                            <p className="text-sm text-gray-600 mb-4">
                                SEO analiz sonuçları burada görüntülenecektir.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {analyses.map((analysis: any) => {
                        const results = analysis.results as any;
                        return (
                            <Card key={analysis.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg text-gray-900">
                                                {analysis.domain}
                                            </CardTitle>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(analysis.createdAt).toLocaleDateString("tr-TR", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </div>
                                                {analysis.email && (
                                                    <div className="text-gray-600">
                                                        {analysis.email}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-auryn-magenta">
                                                {analysis.score}
                                            </div>
                                            <div className="text-sm text-gray-600">/ 100</div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Özet</h4>
                                            <p className="text-sm text-gray-700">{results?.summary}</p>
                                        </div>

                                        {results?.recommendations && results.recommendations.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Öneriler</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                    {results.recommendations.slice(0, 3).map((rec: string, idx: number) => (
                                                        <li key={idx}>{rec}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {results?.technicalIssues && results.technicalIssues.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Teknik Sorunlar</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                    {results.technicalIssues.slice(0, 2).map((issue: string, idx: number) => (
                                                        <li key={idx}>{issue}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
