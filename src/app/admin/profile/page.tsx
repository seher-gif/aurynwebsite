import { ProfileForm } from "@/components/admin/profile-form";

export default function AdminProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Profil Ayarları</h1>
            <div className="max-w-2xl">
                <ProfileForm />
            </div>
        </div>
    );
}
