import { RedirectsList } from "@/components/admin/redirects-list";
import { NotFoundLogs } from "@/components/admin/not-found-logs";

export const dynamic = "force-dynamic";

export default function AdminRedirectsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Yönlendirmeler ve 404 Kayıtları</h1>

            <div className="grid gap-8 lg:grid-cols-2">
                <RedirectsList />
                <NotFoundLogs />
            </div>
        </div>
    );
}
