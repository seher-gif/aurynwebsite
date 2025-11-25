import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function BlogManagementPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Blog Yönetimi
                </h1>
                <Button className="bg-auryn-magenta hover:bg-auryn-dark" asChild>
                    <Link href="/admin/blog/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Blog Yazısı
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-gray-900">Blog Yazıları</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-gray-800">
                        Henüz blog yazısı bulunmuyor. "Yeni Blog Yazısı" butonuna tıklayarak ilk yazınızı oluşturabilirsiniz.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
