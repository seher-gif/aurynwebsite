import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-72 md:flex-col">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-y-auto">
                <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
