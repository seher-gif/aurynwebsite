"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface SEOMetric {
    label: string;
    status: "success" | "warning" | "error";
    message: string;
}

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

interface SEOAnalysisResult {
    url: string;
    score: number;
    scores: PageSpeedScores;
    screenshots: Screenshot[];
    opportunities: Opportunity[];
    metrics: SEOMetric[];
}

export default function SEOAnalysisPage() {
    const [domain, setDomain] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<SEOAnalysisResult | null>(null);
    const [showEmailPrompt, setShowEmailPrompt] = useState(false);

    async function handleAnalyze() {
        if (!domain) return;

        setLoading(true);
        try {
            const response = await fetch('/api/seo/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: domain }), // Changed domain to url
            });

            if (response.ok) {
                const data = await response.json();
                setAnalysis(data);
                setShowEmailPrompt(true);
            } else {
                const errorData = await response.json();
                console.error('Analysis failed:', errorData);
                alert(errorData.error || 'Analiz başarısız oldu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analiz başarısız oldu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    }

    async function handleSendDetailedReport() {
        if (!email || !domain || !analysis) return;

        setLoading(true);
        try {
            const response = await fetch('/api/seo/detailed-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain, email, analysis }),
            });

            if (response.ok) {
                alert('Detaylı rapor email adresinize gönderildi!');
                setShowEmailPrompt(false);
            }
        } catch (error) {
            console.error('Failed to send report:', error);
            alert('Rapor gönderilemedi. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-black min-h-screen">
            <Header />
            <main className="isolate">
                {/* Hero Section */}
                <div className="relative px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black">
                    {/* Decorative background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-auryn-magenta/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-auryn-purple/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading mb-6">
                            Web Sitenizin SEO Puanını <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Ücretsiz</span> Öğrenin
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                            Google E-E-A-T standartlarına göre sitenizi analiz edin ve uzman önerileri alın.
                        </p>

                        {/* Analysis Input */}
                        <div className="mt-10 max-w-2xl mx-auto">
                            {!loading ? (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <div className="relative flex-1 w-full">
                                        <input
                                            type="text"
                                            value={domain}
                                            onChange={(e) => setDomain(e.target.value)}
                                            placeholder="Web sitenizin adresini girin (örn: auryn.com)"
                                            className="w-full rounded-xl bg-gray-900/50 border-2 border-auryn-magenta/30 px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-auryn-magenta focus:border-transparent backdrop-blur-sm transition-all"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleAnalyze}
                                        disabled={loading || !domain}
                                        className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white font-semibold px-8 py-6 h-auto rounded-xl transition-all shadow-lg shadow-auryn-magenta/25"
                                    >
                                        Ücretsiz Analiz Et
                                    </Button>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-auryn-magenta/20 to-auryn-purple/20 border-2 border-auryn-magenta/40 rounded-2xl p-8 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative w-16 h-16">
                                            <div className="absolute inset-0 border-4 border-auryn-magenta/20 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-auryn-magenta border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Analiz Ediliyor...</h3>
                                            <p className="text-gray-300">Lütfen bekleyin. Bu işlem 15-20 saniye sürebilir.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Analysis Results */}
                {analysis && (
                    <div className="px-6 py-16 mx-auto max-w-7xl bg-black">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-3">Analiz Sonuçları</h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-auryn-magenta to-auryn-purple mx-auto rounded-full"></div>
                        </div>

                        {/* Score Cards */}
                        <div className="max-w-5xl mx-auto mb-12">
                            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Google PageSpeed Skorları</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { label: "Performance", score: analysis.scores?.performance || 0, color: "#3b82f6" },
                                    { label: "Accessibility", score: analysis.scores?.accessibility || 0, color: "#10b981" },
                                    { label: "Best Practices", score: analysis.scores?.bestPractices || 0, color: "#f59e0b" },
                                    { label: "SEO", score: analysis.scores?.seo || 0, color: "#ef4444" },
                                ].map((item, index) => {
                                    const getScoreColor = (score: number) => {
                                        if (score >= 80) return "#22c55e";
                                        if (score >= 50) return "#eab308";
                                        return "#ef4444";
                                    };

                                    const scoreColor = getScoreColor(item.score);
                                    const circumference = 2 * Math.PI * 45;
                                    const offset = circumference - (circumference * item.score) / 100;

                                    return (
                                        <div key={index} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                                            <div className="relative w-32 h-32 mx-auto mb-3">
                                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                        fill="none"
                                                        stroke={scoreColor}
                                                        strokeWidth="8"
                                                        strokeLinecap="round"
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={offset}
                                                        className="transition-all duration-1000 "
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-3xl font-bold text-white">{item.score}</span>
                                                </div>
                                            </div>
                                            <div className="text-center text-sm text-gray-300 font-medium">{item.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-slate-400 text-sm text-center mt-6">
                                Analiz edilen: <strong className="text-white">{analysis.url || domain}</strong>
                            </p>
                        </div>

                        {/* Overall Score - Genel Puan */}
                        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 mb-12 border-2 border-auryn-magenta/20 shadow-2xl shadow-auryn-magenta/10">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-8">
                                    Genel SEO Puanınız
                                </h3>
                                <div className="relative inline-block mb-8">
                                    <svg className="w-56 h-56">
                                        <defs>
                                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#e51e51" />
                                                <stop offset="100%" stopColor="#9089fc" />
                                            </linearGradient>
                                        </defs>
                                        <circle
                                            cx="112"
                                            cy="112"
                                            r="100"
                                            fill="none"
                                            stroke="#1f2937"
                                            strokeWidth="20"
                                        />
                                        <circle
                                            cx="112"
                                            cy="112"
                                            r="100"
                                            fill="none"
                                            stroke="url(#scoreGradient)"
                                            strokeWidth="20"
                                            strokeDasharray={`${2 * Math.PI * 100 * (analysis.score / 100)} ${2 * Math.PI * 100}`}
                                            strokeLinecap="round"
                                            transform="rotate(-90 112 112)"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                                            {analysis.score}
                                        </span>
                                        <span className="text-gray-400 text-lg">/100</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Screenshots */}
                        {analysis.screenshots && analysis.screenshots.length > 0 && (
                            <div className="max-w-6xl mx-auto mb-12">
                                <h3 className="text-2xl font-semibold text-white mb-6">Sayfa Görünümleri</h3>
                                <div className="flex gap-4 overflow-x-auto pb-4">
                                    {analysis.screenshots.slice(0, 8).map((screenshot, index) => (
                                        <Image
                                            key={index}
                                            src={screenshot.src}
                                            alt={screenshot.alt}
                                            width={300}
                                            height={192}
                                            className="h-48 w-auto rounded-lg border-2 border-gray-800 flex-shrink-0 hover:border-auryn-magenta/50 transition-colors"
                                            loading="lazy"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Opportunities - Gelişme Fırsatları */}
                        {analysis.opportunities && analysis.opportunities.length > 0 && (
                            <div className="max-w-5xl mx-auto mb-12">
                                <h3 className="text-2xl font-semibold text-white mb-6">🚀 Gelişme Fırsatları</h3>
                                {(() => {
                                    const categories = ["Performance", "Accessibility", "Best Practices", "SEO"];
                                    return categories.map((category) => {
                                        const categoryOpps = analysis.opportunities.filter(
                                            (opp) => opp.category === category
                                        );
                                        if (categoryOpps.length === 0) return null;

                                        return (
                                            <div key={category} className="mb-8">
                                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-auryn-magenta"></span>
                                                    {category}
                                                </h4>
                                                <div className="space-y-3">
                                                    {categoryOpps.slice(0, 10).map((opp, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-auryn-magenta/30 transition-colors"
                                                        >
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <h5 className="font-semibold text-white mb-2">{opp.title}</h5>
                                                                    {opp.description && (
                                                                        <p className="text-sm text-gray-400 leading-relaxed">
                                                                            {opp.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                {opp.savings > 0 && (
                                                                    <div className="flex-shrink-0 text-right">
                                                                        <div className="text-xs text-gray-500 mb-1">Potential savings</div>
                                                                        <div className="text-lg font-bold text-auryn-magenta">
                                                                            ~{Math.round(opp.savings)}ms
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        )}

                        {/* Metrics List */}
                        <div className="max-w-4xl mx-auto grid gap-6 mb-12">
                            {analysis.metrics.map((metric, index) => (
                                <div key={index} className={`p-6 rounded-2xl border ${metric.status === 'success' ? 'bg-green-900/10 border-green-500/20' :
                                    metric.status === 'warning' ? 'bg-yellow-900/10 border-yellow-500/20' :
                                        'bg-red-900/10 border-red-500/20'
                                    }`}>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            {metric.status === 'success' && <CheckCircle className="h-6 w-6 text-green-400" />}
                                            {metric.status === 'warning' && <AlertTriangle className="h-6 w-6 text-yellow-400" />}
                                            {metric.status === 'error' && <XCircle className="h-6 w-6 text-red-400" />}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-2">{metric.label}</h4>
                                            <p className={`text-sm ${metric.status === 'success' ? 'text-green-200' :
                                                metric.status === 'warning' ? 'text-yellow-200' :
                                                    'text-red-200'
                                                }`}>
                                                {metric.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Email Prompt + Partner Logos */}
                        {showEmailPrompt && (
                            <div className="max-w-7xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-8 items-start">
                                    {/* Email Form */}
                                    <div className="bg-gradient-to-br from-auryn-magenta/10 via-black to-auryn-purple/10 rounded-3xl p-12 border-2 border-auryn-magenta/30">
                                        <div className="text-center mb-8">
                                            <div className="inline-block p-4 bg-auryn-magenta/20 rounded-2xl mb-6">
                                                <svg className="w-16 h-16 text-auryn-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4">
                                                Detaylı Raporu <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">E-posta Adresinize</span> Alın
                                            </h3>
                                            <p className="text-gray-300 text-base">
                                                Tüm iyileştirme önerilerini içeren detaylı raporu kaçırmayın.
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="E-posta adresinizi girin"
                                                className="w-full rounded-xl bg-gray-900/50 border-2 border-auryn-magenta/30 px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-auryn-magenta focus:border-transparent backdrop-blur-sm"
                                            />
                                            <Button
                                                onClick={handleSendDetailedReport}
                                                disabled={loading || !email}
                                                className="w-full bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white font-semibold px-10 py-6 h-auto rounded-xl transition-all shadow-lg shadow-auryn-magenta/25"
                                            >
                                                Raporu Gönder
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 text-center mt-6">
                                            Formu göndermek pazarlama iletişimine izin vermiş olursunuz.
                                        </p>
                                    </div>

                                    {/* Partner Logos */}
                                    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-12 border-2 border-gray-800">
                                        <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                            Partnerlerimiz
                                        </h3>
                                        <p className="text-gray-400 text-sm text-center mb-8">
                                            Veri odaklı dijital performans ajansı. Markanızı dijital dünyada büyütüyoruz.
                                        </p>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform">
                                                <Image
                                                    src="/partners/meta-business-partner.png"
                                                    alt="Meta Business Partner"
                                                    width={120}
                                                    height={80}
                                                    className="w-full h-auto max-h-20 object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="bg-purple-900/20 rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform border border-purple-500/20">
                                                <Image
                                                    src="/partners/semrush-partner.jpg"
                                                    alt="Semrush Certified Agency Partner"
                                                    width={120}
                                                    height={80}
                                                    className="w-full h-auto max-h-20 object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="bg-white rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform">
                                                <Image
                                                    src="/partners/yandex-partner.png"
                                                    alt="Yandex Partner"
                                                    width={120}
                                                    height={80}
                                                    className="w-full h-auto max-h-20 object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="bg-gradient-to-br from-yellow-100 to-purple-100 rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform">
                                                <Image
                                                    src="/partners/ikas-partner.jpg"
                                                    alt="ikas Partner"
                                                    width={120}
                                                    height={80}
                                                    className="w-full h-auto max-h-20 object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
            {/* <Footer /> */}
        </div>
    );
}
