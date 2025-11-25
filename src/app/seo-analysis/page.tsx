"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function SEOAnalysisPage() {
    const [domain, setDomain] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);
    const [showEmailPrompt, setShowEmailPrompt] = useState(false);

    async function handleAnalyze() {
        if (!domain) return;

        setLoading(true);
        try {
            const response = await fetch('/api/seo/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain }),
            });

            if (response.ok) {
                const data = await response.json();
                setAnalysis(data);
                setShowEmailPrompt(true);
            }
        } catch (error) {
            console.error('Analysis failed:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSendDetailedReport() {
        if (!email || !domain) return;

        setLoading(true);
        try {
            const response = await fetch('/api/seo/detailed-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain, email }),
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
                        <div className="inline-block mb-6 px-4 py-2 bg-auryn-magenta/10 border border-auryn-magenta/30 rounded-full">
                            <span className="text-auryn-magenta font-semibold text-sm">Ücretsiz SEO Analizi</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading mb-6">
                            Web Sitenizin SEO Puanını <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">Ücretsiz</span> Öğrenin
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                            SEO performansınızı saniyeler içinde analiz ederek site hızı, anahtar kelime kullanımı, ve teknik hatalar hakkında detaylı bilgi edinin.
                        </p>

                        {/* Analysis Input */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
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
                                {loading ? "Analiz Ediliyor..." : "Ücretsiz Analiz Et"}
                            </Button>
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

                        {/* Score Card */}
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
                                <p className="text-gray-300 max-w-xl mx-auto text-lg">
                                    {analysis.summary || "Siteniz genel olarak iyi durumda, ancak birkaç iyileştirme ile daha da iyileştirebilir."}
                                </p>
                            </div>
                        </div>

                        {/* Score Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-auryn-magenta/20 hover:border-auryn-magenta/40 transition-all group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 bg-auryn-magenta/10 rounded-xl group-hover:bg-auryn-magenta/20 transition-all">
                                        <TrendingUp className="h-8 w-8 text-auryn-magenta" />
                                    </div>
                                    <span className="text-4xl font-bold text-white">92</span>
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-3">Site Hızı</h4>
                                <p className="text-gray-400 mb-4">
                                    Sayfa yükleme hızı mükemmel. Kullanıcı deneyimi için harika.
                                </p>
                                <div className="text-sm text-green-400 font-medium">+5.2%</div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-auryn-purple/20 hover:border-auryn-purple/40 transition-all group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 bg-auryn-purple/10 rounded-xl group-hover:bg-auryn-purple/20 transition-all">
                                        <Target className="h-8 w-8 text-auryn-purple" />
                                    </div>
                                    <span className="text-4xl font-bold text-white">98</span>
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-3">Erişilebilirlik</h4>
                                <p className="text-gray-400 mb-4">
                                    Hedef anahtar kelimeleriniz için uyumlu ve doğru kullanılmış.
                                </p>
                                <div className="text-sm text-green-400 font-medium">+1.5%</div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 bg-white/5 rounded-xl group-hover:bg-white/10 transition-all">
                                        <FileText className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="text-4xl font-bold text-white">89</span>
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-3">En İyi Uygulamalar</h4>
                                <p className="text-gray-400 mb-4">
                                    H1 ve H2 etiket yapınızda bazı iyileştirmeler gerekiyor.
                                </p>
                                <div className="text-sm text-yellow-400 font-medium">-0.8%</div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-auryn-magenta/20 mb-12">
                            <h3 className="text-2xl font-bold text-white mb-6">Yapılacaklar Listesi</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-red-900/10 border border-red-500/20 rounded-xl">
                                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-white font-medium mb-1">Kırık linkler kontrol edilmeli.</p>
                                        <p className="text-red-400 text-sm">Yüksek Öncelik</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-xl">
                                    <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-white font-medium mb-1">Meta description olmayan 8 sayfa var.</p>
                                        <p className="text-yellow-400 text-sm">Orta Öncelik</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-green-900/10 border border-green-500/20 rounded-xl">
                                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-white font-medium mb-1">Mobil-uyumluluk testi yapılmıştır.</p>
                                        <p className="text-green-400 text-sm">Tamamlandı</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-xl">
                                    <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-white font-medium mb-1">Görseller için alt text eklenmelidir.</p>
                                        <p className="text-yellow-400 text-sm">Orta Öncelik</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Prompt */}
                        {showEmailPrompt && (
                            <div className="bg-gradient-to-br from-auryn-magenta/10 via-black to-auryn-purple/10 rounded-3xl p-12 border-2 border-auryn-magenta/30">
                                <div className="text-center mb-8">
                                    <div className="inline-block p-4 bg-auryn-magenta/20 rounded-2xl mb-6">
                                        <svg className="w-16 h-16 text-auryn-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-4">
                                        Detaylı Raporu <span className="text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">E-posta Adresinize</span> Alın
                                    </h3>
                                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                                        Tüm iyileştirme önerilerini içeren detaylı raporu kaçırmayın. Analiz sonucunu ve gelecek için ipuçlarını size göndereceğiz.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="E-posta adresinizi girin"
                                        className="flex-1 rounded-xl bg-gray-900/50 border-2 border-auryn-magenta/30 px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-auryn-magenta focus:border-transparent backdrop-blur-sm"
                                    />
                                    <Button
                                        onClick={handleSendDetailedReport}
                                        disabled={loading || !email}
                                        className="bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white font-semibold px-10 py-6 h-auto rounded-xl transition-all shadow-lg shadow-auryn-magenta/25"
                                    >
                                        Raporu Gönder
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 text-center mt-6">
                                    Formu göndermek pazarlama iletişimine izin vermiş olursunuz.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
