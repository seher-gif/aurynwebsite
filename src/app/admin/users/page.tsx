import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Shield, Mail } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function UsersPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Kullanıcı Yönetimi
                </h1>
                <Button className="bg-auryn-magenta hover:bg-auryn-dark">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Yeni Kullanıcı Ekle
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
                        <Shield className="h-4 w-4 text-auryn-magenta" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">1</div>
                        <p className="text-xs text-gray-600">Aktif admin</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admin</CardTitle>
                        <Shield className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">1</div>
                        <p className="text-xs text-gray-600">Tam yetki</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Editör</CardTitle>
                        <Mail className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <p className="text-xs text-gray-600">Kısıtlı yetki</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Kullanıcı Listesi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Link href="/admin/users/edit/seher@auryndijital.com">
                            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
                                <div>
                                    <p className="font-medium text-gray-900">Admin User</p>
                                    <p className="text-sm text-gray-600">seher@auryndijital.com</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs font-semibold text-white bg-auryn-magenta rounded">ADMIN</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
