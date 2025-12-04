"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, XCircle, Loader2, RefreshCcw, Activity, Mail, Send } from "lucide-react";

const formSchema = z.object({
    url: z.string().url("Lütfen geçerli bir URL giriniz (Örn: https://google.com)"),
});

type FormData = z.infer<typeof formSchema>;

interface PageSpeedScores {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
}

interface Screenshot {
    src: string;
    alt: string;
}

interface Opportunity {
    category: string;
    title: string;
    description: string;
    savings: number;
}

interface SEOMetric {
    label: string;
    status: "success" | "warning" | "error";
    message: string;
}

interface AnalysisResult {
    url: string;
    scores: PageSpeedScores;
    screenshots: Screenshot[];
    opportunities: Opportunity[];
    metrics: SEOMetric[];
}

export function SeoAnalysisForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

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
        setApiError(null);
        setEmailSent(false);

        try {
            const response = await fetch("/api/seo/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: data.url }),
            });

            const resultData = await response.json();

            if (!response.ok) {
                throw new Error(resultData.error || "Analiz sırasında sunucu hatası oluştu.");
            }

            setResult(resultData);
        } catch (error: any) {
            console.error("Hata:", error);
            setApiError(error.message || "Beklenmedik bir hata oluştu. Lütfen URL'i kontrol edin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendEmail = async () => {
        if (!email || !result) return;

        setIsSendingEmail(true);
        try {
            const response = await fetch("/api/seo/send-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    url: result.url,
                    analysisData: result,
                }),
            });

            if (!response.ok) {
                throw new Error("Email gönderilemedi");
            }

            setEmailSent(true);
        } catch (error) {
            console.error("Email error:", error);
            alert("Email gönderilemedi. Lütfen tekrar deneyin.");
        } finally {
            setIsSendingEmail(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    const getScoreGradient = (score: number) => {
        if (score >= 80) return "url(#greenGradient)";
        if (score >= 50) return "url(#yellowGradient)";
        return "url(#redGradient)";
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {!result ? (
                /* FORM SCREEN */
                <>
                    {!isSubmitting ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Web Sitesi SEO Analizi</h2>
                                <p className="text-slate-400">Google PageSpeed Insights ile sitenizin performansını ve SEO puanını öğrenin.</p>
                            </div>

                            <div>
                                <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-2">
                                    Website URL
                                </label>
                                <input
                                    type="url"
                                    id="url"
                                    placeholder="https://ornek-site.com"
                                    {...register("url")}
                                    className="block w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                />
                                {errors.url && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.url.message}
                                    </p>
                                )}
                            </div>

                            {apiError && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200">
                                    <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                                    <span className="text-sm font-medium">{apiError}</span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
                            >
                                <span className="flex items-center gap-2 justify-center">
                                    <Activity className="h-5 w-5" /> Ücretsiz Analiz Et
                                </span>
                            </Button>
                        </form>
                    ) : (
                        /* LOADING STATE */
                        <div className="py-12 text-center space-y-6">
                            <div className="flex justify-center">
                                <div className="relative w-24 h-24">
                                    <div className="absolute inset-0 border-8 border-blue-500/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">Analiz Ediliyor...</h3>
                                <p className="text-slate-400 text-lg mb-2">Lütfen bekleyin, siteniz detaylı olarak analiz ediliyor.</p>
                                <p className="text-slate-500 text-sm">Bu işlem 15-20 saniye sürebilir.</p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                /* RESULTS SCREEN */
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8">
                    {/* PageSpeed Scores */}
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-white mb-6">Analiz Raporu</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[
                                { label: "Performance", score: result.scores.performance },
                                { label: "Accessibility", score: result.scores.accessibility },
                                { label: "Best Practices", score: result.scores.bestPractices },
                                { label: "SEO", score: result.scores.seo },
                            ].map((item, index) => (
                                <div key={index} className="bg-slate-800/50 rounded-xl p-4">
                                    <div className="relative w-24 h-24 mx-auto mb-2">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            <defs>
                                                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#22c55e" />
                                                    <stop offset="100%" stopColor="#14532d" />
                                                </linearGradient>
                                                <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#eab308" />
                                                    <stop offset="100%" stopColor="#713f12" />
                                                </linearGradient>
                                                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#ef4444" />
                                                    <stop offset="100%" stopColor="#7f1d1d" />
                                                </linearGradient>
                                            </defs>
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke={getScoreGradient(item.score)}
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray="283"
                                                strokeDashoffset={283 - (283 * item.score) / 100}
                                                className="transition-all duration-1000"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                                                {item.score}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-300 font-medium">{item.label}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-400 text-sm">Analiz edilen: <strong className="text-white">{result.url}</strong></p>
                    </div>

                    {/* Screenshots */}
                    {result.screenshots.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {result.screenshots.slice(0, 5).map((screenshot, index) => (
                                <img
                                    key={index}
                                    src={screenshot.src}
                                    alt={screenshot.alt}
                                    className="w-48 h-auto rounded-lg border border-slate-700 flex-shrink-0"
                                />
                            ))}
                        </div>
                    )}

                    {/* Opportunities */}
                    {result.opportunities.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">🚀 Gelişme Fırsatları (İlk 5)</h4>
                            <div className="space-y-3">
                                {result.opportunities.slice(0, 5).map((opp, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl"
                                    >
                                        <p className="font-semibold text-yellow-400 mb-1">
                                            {opp.category}: {opp.title}
                                        </p>
                                        {opp.savings > 0 && (
                                            <p className="text-sm text-slate-400">⚡ Potansiyel tasarruf: ~{Math.round(opp.savings)}ms</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metrics */}
                    {result.metrics.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">📊 Teknik SEO Analizi</h4>
                            <div className="grid gap-3">
                                {result.metrics.map((metric, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-3 p-4 rounded-xl border ${metric.status === "success"
                                            ? "bg-green-500/5 border-green-500/20"
                                            : metric.status === "warning"
                                                ? "bg-yellow-500/5 border-yellow-500/20"
                                                : "bg-red-500/5 border-red-500/20"
                                            }`}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            {metric.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                            {metric.status === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                                            {metric.status === "error" && <XCircle className="h-5 w-5 text-red-500" />}
                                        </div>
                                        <div>
                                            <h5 className={`font-semibold text-sm mb-1 ${metric.status === "success"
                                                ? "text-green-400"
                                                : metric.status === "warning"
                                                    ? "text-yellow-400"
                                                    : "text-red-400"
                                                }`}>
                                                {metric.label}
                                            </h5>
                                            <p className="text-sm text-slate-300">{metric.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Email Form */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="h-6 w-6 text-blue-400" />
                            <h4 className="text-lg font-semibold text-white">Detaylı Raporu Email ile Alın</h4>
                        </div>
                        <p className="text-slate-300 text-sm mb-4">
                            Tüm metrikleri, fırsatları ve önerileri içeren detaylı raporu email adresinize gönderelim.
                        </p>
                        {!emailSent ? (
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@ornek.com"
                                    className="flex-1 rounded-xl bg-slate-950 border border-slate-700 text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <Button
                                    onClick={handleSendEmail}
                                    disabled={!email || isSendingEmail}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                                >
                                    {isSendingEmail ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-2" /> Gönder
                                        </>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-300 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                <span>Detaylı rapor {email} adresine gönderildi!</span>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={() => {
                            setResult(null);
                            setEmail("");
                            setEmailSent(false);
                        }}
                        variant="outline"
                        className="w-full py-6 border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="h-4 w-4" /> Yeni Analiz Yap
                    </Button>
                </div>
            )}
        </div>
    );
}