"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, Eye, Archive, RefreshCw, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: string;
    createdAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/admin/messages");
            const data = await response.json();
            if (data.messages) {
                setMessages(data.messages);
            } else {
                setError("Mesajlar yüklenemedi.");
            }
        } catch (err) {
            setError("Mesajlar yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

        try {
            const response = await fetch(`/api/admin/messages?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setMessages(messages.filter((m) => m.id !== id));
                if (selectedMessage?.id === id) {
                    setSelectedMessage(null);
                }
            }
        } catch (err) {
            alert("Mesaj silinemedi.");
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            const response = await fetch("/api/admin/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (response.ok) {
                setMessages(messages.map((m) =>
                    m.id === id ? { ...m, status } : m
                ));
                if (selectedMessage?.id === id) {
                    setSelectedMessage({ ...selectedMessage, status });
                }
            }
        } catch (err) {
            alert("Durum güncellenemedi.");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "NEW":
                return "bg-blue-100 text-blue-800";
            case "READ":
                return "bg-green-100 text-green-800";
            case "ARCHIVED":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "NEW":
                return "Yeni";
            case "READ":
                return "Okundu";
            case "ARCHIVED":
                return "Arşivlendi";
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <Button onClick={fetchMessages} className="mt-4">
                    Tekrar Dene
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    İletişim Mesajları
                </h1>
                <Button variant="outline" onClick={fetchMessages}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Yenile
                </Button>
            </div>

            {messages.length === 0 ? (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center text-gray-500">
                            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Henüz iletişim mesajı bulunmuyor.</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Messages List */}
                    <div className="lg:col-span-1 space-y-3">
                        {messages.map((message) => (
                            <Card
                                key={message.id}
                                className={`cursor-pointer hover:shadow-md transition-shadow ${selectedMessage?.id === message.id ? "ring-2 ring-blue-500" : ""
                                    }`}
                                onClick={() => {
                                    setSelectedMessage(message);
                                    if (message.status === "NEW") {
                                        handleStatusChange(message.id, "READ");
                                    }
                                }}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="font-medium text-gray-900 truncate flex-1">
                                            {message.name}
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ml-2 ${getStatusColor(message.status)}`}>
                                            {getStatusLabel(message.status)}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 truncate mb-1">
                                        {message.subject || "Konu belirtilmemiş"}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {formatDate(message.createdAt)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-2">
                        {selectedMessage ? (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle>{selectedMessage.subject || "Konu belirtilmemiş"}</CardTitle>
                                        <div className="flex gap-2">
                                            {selectedMessage.status !== "ARCHIVED" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleStatusChange(selectedMessage.id, "ARCHIVED")}
                                                >
                                                    <Archive className="h-4 w-4 mr-1" />
                                                    Arşivle
                                                </Button>
                                            )}
                                            {selectedMessage.status === "ARCHIVED" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleStatusChange(selectedMessage.id, "READ")}
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Geri Al
                                                </Button>
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(selectedMessage.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Sil
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-500">Gönderen:</span>
                                                <p className="text-gray-900">{selectedMessage.name}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500">E-posta:</span>
                                                <p className="text-gray-900">
                                                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                                                        {selectedMessage.email}
                                                    </a>
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500">Telefon:</span>
                                                <p className="text-gray-900">
                                                    {selectedMessage.phone ? (
                                                        <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:underline">
                                                            {selectedMessage.phone}
                                                        </a>
                                                    ) : (
                                                        "Belirtilmemiş"
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500">Tarih:</span>
                                                <p className="text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="border-t pt-4">
                                            <span className="font-medium text-gray-500 block mb-2">Mesaj:</span>
                                            <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="py-12">
                                    <div className="text-center text-gray-500">
                                        <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Detayları görmek için bir mesaj seçin.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
