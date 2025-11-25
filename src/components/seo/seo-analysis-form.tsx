"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, XCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
    url: z.string().url("Geçerli bir URL giriniz (https://...)"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz.").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

type AnalysisResult = {
    score: number;
    metrics: {
        label: string;
        status: "success" | "warning" | "error";
        message: string;
    }[];
};

export function SeoAnalysisForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setResult(null);

        // Simulate API call and analysis
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock results
        setResult({
            score: 78,
            metrics: [
                { label: "Mobil Uyumluluk", status: "success", message: "Siteniz mobil uyumlu görünüyor." },
                { label: "Site Hızı", status: "warning", message: "Yükleme hızı iyileştirilebilir (LCP > 2.5s)." },
                { label: "SSL Sertifikası", status: "success", message: "Güvenli bağlantı (HTTPS) aktif." },
                { label: "Meta Etiketleri", status: "success", message: "Başlık ve açıklama etiketleri mevcut." },
                { label: "Görsel Optimizasyonu", status: "error", message: "Bazı görsellerde alt etiketi eksik." },
                { label: "Kırık Linkler", status: "success", message: "Kırık link bulunamadı." },
            ],
        });

        setIsSubmitting(false);
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 sm:p-10 rounded-2xl shadow-2xl border border-auryn-magenta/20">
            {!result ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="url" className="block text-sm font-semibold leading-6 text-white">
                            Web Sitesi Adresi (URL)
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="url"
                                id="url"
                                placeholder="https://example.com"
                                {...register("url")}
                                className="block w-full rounded-xl bg-white/5 border-2 border-white/10 px-3.5 py-2 text-white shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-auryn-magenta focus:border-transparent backdrop-blur-sm transition-all sm:text-sm sm:leading-6"
                            />
                            {errors.url && <p className="mt-1 text-sm text-red-400">{errors.url.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                            E-posta (Raporu gönder) - Opsiyonel
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                id="email"
                                {...register("email")}
                                className="block w-full rounded-xl bg-white/5 border-2 border-white/10 px-3.5 py-2 text-white shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-auryn-magenta focus:border-transparent backdrop-blur-sm transition-all sm:text-sm sm:leading-6"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analiz Ediliyor...
                                </>
                            ) : (
                                "Ücretsiz Analiz Et"
                            )}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-semibold text-white">Analiz Sonucu</h3>
                        <div className="mt-6 flex items-center justify-center">
                            <div className="relative flex items-center justify-center w-40 h-40">
                                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">{result.score}</span>
                                <span className="absolute text-sm text-gray-400 -bottom-6">/ 100</span>
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#e51e51" />
                                            <stop offset="100%" stopColor="#9089fc" />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#1f2937"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="url(#scoreGradient)"
                                        strokeWidth="8"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 - (283 * result.score) / 100}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {result.metrics.map((metric, index) => (
                            <div key={index} className={`flex items-start gap-4 p-4 rounded-lg border ${metric.status === "success" ? "bg-green-900/10 border-green-500/20" :
                                    metric.status === "warning" ? "bg-yellow-900/10 border-yellow-500/20" :
                                        "bg-red-900/10 border-red-500/20"
                                }`}>
                                {metric.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />}
                                {metric.status === "warning" && <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />}
                                {metric.status === "error" && <XCircle className="h-5 w-5 text-red-400 mt-0.5" />}
                                <div>
                                    <h4 className="font-medium text-white">{metric.label}</h4>
                                    <p className="text-sm text-gray-400">{metric.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Button onClick={() => setResult(null)} variant="outline" className="w-full border-auryn-magenta/30 hover:border-auryn-magenta/50 text-white">
                            Yeni Analiz Yap
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
