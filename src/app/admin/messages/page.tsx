import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Filter, Trash2, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default function MessagesPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    İletişim Mesajları
                </h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtrele
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gelen Mesajlar</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-gray-600">
                        Henüz iletişim mesajı bulunmuyor. Mesajlar burada görüntülenecektir.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
