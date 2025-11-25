import { PageForm } from "@/components/admin/page-form";

export default async function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PageForm pageId={id === "new" ? undefined : id} />;
}
