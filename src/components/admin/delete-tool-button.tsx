"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteMarketingTool } from "@/lib/actions/admin";
import { useTransition } from "react";

export function DeleteToolButton({ toolId }: { toolId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("Bu aracı silmek istediğinizden emin misiniz?")) {
            startTransition(async () => {
                await deleteMarketingTool(toolId);
            });
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-600 hover:text-red-700"
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
