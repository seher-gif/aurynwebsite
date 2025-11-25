import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Search, Users } from "lucide-react";

// Mock data
const stats = [
    {
        title: "Toplam Blog Yazısı",
        value: "12",
        icon: FileText,
        description: "Yayında olan içerikler",
    },
    {
        title: "Yeni Mesajlar",
        value: "5",
        icon: MessageSquare,
        description: "Okunmamış iletişim mesajları",
    },
    {
        title: "SEO Analizleri",
        value: "148",
        icon: Search,
        description: "Son 30 günde yapılan analizler",
    },
    {
        title: "Kullanıcılar",
        value: "3",
        icon: Users,
        description: "Aktif admin kullanıcıları",
    },
];

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Merhaba Admin, Auryn Dijital Yönetim Paneline Hoş Geldiniz!
            </h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-t-4 border-t-auryn-magenta shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-[#e51e51]">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-auryn-magenta" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-xs text-gray-700">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Son SEO Analizleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-700">Henüz veri yok.</div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Son Mesajlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-700">Henüz veri yok.</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
