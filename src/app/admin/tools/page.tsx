import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Code } from "lucide-react";
import Link from "next/link";
import { DeleteToolButton } from "@/components/admin/delete-tool-button";

export const dynamic = "force-dynamic";

export default async function DigitalToolsPage() {
    const tools = await prisma.marketingTool.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Dijital Araçlar
                </h1>
                <Link href="/admin/tools/new">
                    <Button className="bg-auryn-magenta hover:bg-auryn-dark">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Araç Ekle
                    </Button>
                </Link>
            </div>

            {tools.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center text-gray-600">
                            <Code className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">Henüz araç eklenmemiş</p>
                            <p className="text-sm text-gray-600 mb-4">
                                Pazarlama araçları eklemek için "Yeni Araç Ekle" butonuna tıklayın.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {tools.map((tool: any) => {
                        const data = tool.data as any;
                        return (
                            <Card key={tool.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg text-gray-900">{tool.name}</CardTitle>
                                        <p className="text-sm text-gray-600 mt-1">{tool.type}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/tools/${tool.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <DeleteToolButton toolId={tool.id} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        {data?.headerCode && (
                                            <div className="flex items-center text-gray-700">
                                                <span className="font-medium mr-2">Header:</span>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Kod mevcut</span>
                                            </div>
                                        )}
                                        {data?.bodyCode && (
                                            <div className="flex items-center text-gray-700">
                                                <span className="font-medium mr-2">Body:</span>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Kod mevcut</span>
                                            </div>
                                        )}
                                        {data?.footerCode && (
                                            <div className="flex items-center text-gray-700">
                                                <span className="font-medium mr-2">Footer:</span>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Kod mevcut</span>
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
