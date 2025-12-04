import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
    let clients: any[] = [];
    try {
        clients = await prisma.client.findMany({
            orderBy: { order: "asc" },
        });
    } catch (error) {
        console.log('Client table not found yet');
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Müşteri Logoları
                </h1>
                <Link href="/admin/clients/new">
                    <Button className="bg-auryn-magenta hover:bg-auryn-dark">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Logo Ekle
                    </Button>
                </Link>
            </div>

            {clients.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center text-gray-600">
                            <p className="text-lg font-medium text-gray-900 mb-2">Henüz müşteri logosu eklenmemiş</p>
                            <p className="text-sm text-gray-600 mb-4">
                                Müşteri logoları eklemek için "Yeni Logo Ekle" butonuna tıklayın.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clients.map((client: any) => (
                        <Card key={client.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {client.name}
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Link href={`/admin/clients/${client.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="relative h-24 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                                    {client.logo && (
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            width={120}
                                            height={60}
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 space-y-1">
                                    <div>Sıra: {client.order}</div>
                                    {client.website && (
                                        <div className="flex items-center gap-1">
                                            <ExternalLink className="h-3 w-3" />
                                            <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:text-auryn-magenta">
                                                {new URL(client.website).hostname}
                                            </a>
                                        </div>
                                    )}
                                    <div className={`inline-block px-2 py-1 rounded text-xs ${client.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {client.active ? 'Aktif' : 'Pasif'}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
