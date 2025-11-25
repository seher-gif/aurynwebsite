import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Globe, Lock, Bell, Palette } from "lucide-react";
import Link from "next/link";

const settingsSections = [
    {
        title: "Genel Ayarlar",
        description: "Site başlığı, açıklama ve temel ayarlar",
        icon: Globe,
        href: "/admin/settings/general",
    },
    {
        title: "Güvenlik",
        description: "Parola politikaları ve oturum ayarları",
        icon: Lock,
        href: "/admin/settings/security",
    },
    {
        title: "Bildirimler",
        description: "E-posta ve sistem bildirimleri",
        icon: Bell,
        href: "/admin/settings/notifications",
    },
    {
        title: "Tema & Görünüm",
        description: "Logo, renkler ve site görünümü",
        icon: Palette,
        href: "/admin/settings/branding",
    },
];

export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Ayarlar
            </h1>

            <div className="grid gap-4 md:grid-cols-2">
                {settingsSections.map((section) => (
                    <Link key={section.title} href={section.href}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 bg-auryn-magenta/10 rounded-lg">
                                    <section.icon className="h-6 w-6 text-auryn-magenta" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg text-gray-900">{section.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-800">{section.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}           </div>
        </div>
    );
}
