import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, FileText } from "lucide-react";
import Link from "next/link";

export default async function CaseStudiesPage() {
    const caseStudies = await prisma.caseStudy.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Vaka Çalışmaları
                </h1>
                <Link href="/admin/case-studies/new">
                    <Button className="bg-auryn-magenta hover:bg-auryn-dark">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Vaka Çalışması
                    </Button>
                </Link>
            </div>

            {caseStudies.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center text-gray-600">
                            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">Henüz vaka çalışması eklenmemiş</p>
                            <p className="text-sm text-gray-600 mb-4">
                                Vaka çalışmaları eklemek için "Yeni Vaka Çalışması" butonuna tıklayın.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {caseStudies.map((caseStudy: any) => (
                        <Card key={caseStudy.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <span>{caseStudy.client}</span>
                                        <span className="px-2 py-1 bg-auryn-magenta/10 text-auryn-magenta rounded text-xs">
                                            {caseStudy.category}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs ${caseStudy.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {caseStudy.published ? 'Yayında' : 'Taslak'}
                                        </span>
                                    </div>
                                </div>
                                <Link href={`/admin/case-studies/${caseStudy.id}/edit`}>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 line-clamp-2">{caseStudy.excerpt}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
