import { HomepageHeroForm } from "@/components/admin/homepage-hero-form";

export const dynamic = "force-dynamic";

export default function AdminHomepageSettings() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Anasayfa Yönetimi</h1>
            <HomepageHeroForm />
        </div>
    );
}
