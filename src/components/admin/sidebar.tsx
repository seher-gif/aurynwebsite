"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    PenTool,
    BarChart,
    MessageSquare,
    Settings,
    Users,
    LogOut,
    Search,
    Megaphone,
    Briefcase,
    BookOpen
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Sayfa Yönetimi", href: "/admin/pages", icon: FileText },
    { name: "Blog Yönetimi", href: "/admin/blog", icon: PenTool },
    { name: "Müşteriler", href: "/admin/clients", icon: Briefcase },
    { name: "Vaka Çalışmaları", href: "/admin/case-studies", icon: BookOpen },
    { name: "Dijital Araçlar", href: "/admin/tools", icon: Megaphone },
    { name: "SEO & Site Skoru", href: "/admin/seo-score", icon: BarChart },
    { name: "SEO Analiz Sonuçları", href: "/admin/seo-results", icon: Search },
    { name: "İletişim Mesajları", href: "/admin/messages", icon: MessageSquare },
    { name: "Kullanıcı Yönetimi", href: "/admin/users", icon: Users },
    { name: "Ayarlar", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
                <div className="text-2xl font-bold text-white tracking-tighter">
                    AURYN<span className="text-auryn-magenta">.</span> <span className="text-xs font-normal text-gray-400 ml-2">Admin</span>
                </div>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            pathname === item.href
                                                ? "bg-gray-800 text-white"
                                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                        )}
                                    >
                                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="mt-auto">
                        <button
                            onClick={() => signOut()}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white w-full text-left"
                        >
                            <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
                            Çıkış Yap
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
