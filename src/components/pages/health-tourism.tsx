import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronDown, Globe, Search, FileText, MapPin, Megaphone, BarChart2, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import type { Locale } from "@/lib/i18n/routes";

export const HEALTH_TOURISM_PATHS = {
    tr: "/hizmetler/saglik-turizmi-dijital-pazarlama",
    en: "/en/services/health-tourism-marketing",
} as const;

const ICONS = [Globe, Search, MapPin, Megaphone, FileText, BarChart2];

interface Content {
    breadcrumbHome: string;
    breadcrumbServices: string;
    breadcrumbName: string;
    servicesPath: string;
    serviceDescription: string;
    serviceType: string;
    h1Lead: string;
    h1Highlight: string;
    intro: string;
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
    whyTitle: string;
    why: { title: string; description: string }[];
    servicesTitle: string;
    servicesIntro: string;
    services: { title: string; features: string[] }[];
    processTitle: string;
    process: { title: string; description: string }[];
    complianceTitle: string;
    complianceIntro: string;
    compliance: string[];
    complianceNote: string;
    readTitle: string;
    read: { label: string; href: string }[];
    faqTitle: string;
    faq: { question: string; answer: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    ctaHref: string;
}

const CONTENT: Record<Locale, Content> = {
    tr: {
        breadcrumbHome: "Anasayfa",
        breadcrumbServices: "Hizmetler",
        breadcrumbName: "Sağlık Turizmi Dijital Pazarlama",
        servicesPath: "/hizmetler",
        serviceDescription: "Klinik, hastane ve sağlık turizmi aracı kuruluşları için çok dilli SEO, Google Ads, Meta reklamları ve ölçümleme hizmeti.",
        serviceType: "Health tourism SEO and digital marketing",
        h1Lead: "Sağlık Turizmi SEO ve",
        h1Highlight: "Dijital Pazarlama Danışmanlığı",
        intro:
            "Klinik, hastane ve sağlık turizmi aracı kuruluşlarının yurt dışındaki hastalar tarafından Google'da bulunmasını, güven vermesini ve iletişime geçilmesini sağlıyoruz. Çok dilli SEO, Google Ads, Meta reklamları ve ölçüm altyapısını tek bir stratejide birleştiriyoruz; mevzuat ve platform politikalarını baştan hesaba katıyoruz.",
        primaryCta: "Ücretsiz SEO Analizi",
        primaryHref: "/seo-analizi",
        secondaryCta: "Teklif Alın",
        secondaryHref: "/iletisim",
        whyTitle: "Sağlık Turizminde Dijital Pazarlama Neden Farklı?",
        why: [
            {
                title: "Uzun ve güven odaklı karar süreci",
                description:
                    "Hasta bir tedaviye karar vermeden önce uzun süre araştırma yapar; doktoru, kliniği, yorumları ve süreci karşılaştırır. İçerik, hekim profilleri ve şeffaf bilgilendirme bu yolculuğun her adımında güven kurar.",
            },
            {
                title: "Çok dilli ve çok pazarlı arama",
                description:
                    "Aynı tedavi için farklı ülkelerde farklı kelimeler aranır. Sadece çeviri değil, her pazarın arama niyetine göre kurgulanmış sayfalar ve doğru hreflang yapısı gerekir.",
            },
            {
                title: "Sağlık içeriğinde yüksek kalite çıtası",
                description:
                    "Google, insanların sağlığını önemli ölçüde etkileyebilecek konularda içeriğin yüksek doğrulukta ve uzman görüşüyle tutarlı olmasını bekler. Bu yüzden sağlık sitelerinde yazar, kaynak ve hekim bilgisi isteğe bağlı değil, temel gerekliliktir.",
            },
        ],
        servicesTitle: "Sağlık Turizmi İçin Hizmetlerimiz",
        servicesIntro:
            "Tedavi türüne, hedef ülkeye ve kliniğin kapasitesine göre kapsamı birlikte belirliyoruz. Aşağıdakiler başlıca çalışma alanlarımızdır.",
        services: [
            {
                title: "Çok Dilli SEO ve hreflang",
                features: [
                    "Hedef pazar dillerinde anahtar kelime ve niyet araştırması",
                    "TR / EN / DE / AR / RU gibi dillerde site mimarisi planı (kapsam projeye göre belirlenir)",
                    "Doğru hreflang, canonical ve sitemap yapılandırması",
                    "Çevirilerin insan kontrolüyle yayınlanması",
                ],
            },
            {
                title: "Tedavi ve Bölüm Sayfası Mimarisi",
                features: [
                    "Saç ekimi, diş, estetik, göz, tüp bebek, check-up gibi tedavi başına odaklı sayfalar",
                    "Süreç, hazırlık, iyileşme ve SSS bölümleri",
                    "Şehir ve ülke bazlı hedefleme sayfaları",
                    "İç link yapısı ve konu kümeleri",
                ],
            },
            {
                title: "Yerel SEO ve Google İşletme Profili",
                features: [
                    "Klinik konumu için Google Maps ve işletme profili optimizasyonu",
                    "Adres, çalışma saatleri ve iletişim bilgisinde tutarlılık",
                    "Yerel schema ve yapılandırılmış veri",
                    "Antalya, İstanbul ve diğer şehirlere özel stratejiler",
                ],
            },
            {
                title: "Google Ads ve Meta Reklamları",
                features: [
                    "Sağlık reklam politikalarına uygun kampanya kurgusu",
                    "Ülke ve dil bazlı kampanya yapısı",
                    "Hedef sayfa (landing page) ve form iyileştirme",
                    "Bütçe ve teklif optimizasyonu",
                ],
            },
            {
                title: "İçerik ve E-E-A-T Çalışmaları",
                features: [
                    "Hekim profilleri ve tıbbi inceleme notları",
                    "Kaynak gösteren, doğruluğu kontrol edilmiş içerik üretimi",
                    "Hasta bilgilendirme rehberleri",
                    "Sağlık içeriği için editoryal kontrol süreci",
                ],
            },
            {
                title: "Ölçüm ve Raporlama",
                features: [
                    "GA4 ve Search Console kurulumu",
                    "Form, telefon ve WhatsApp dönüşüm takibi",
                    "KVKK uyumlu izleme ve çerez yönetimi",
                    "Ülke ve dil bazlı performans raporları",
                ],
            },
        ],
        processTitle: "Nasıl Çalışıyoruz?",
        process: [
            { title: "1. Keşif ve uyum kontrolü", description: "Kliniğinizi, tedavilerinizi, hedef ülkelerinizi ve mevcut siteyi inceler; reklam ve içerik kısıtlarını belirleriz." },
            { title: "2. Pazar ve anahtar kelime araştırması", description: "Her pazarda hastaların gerçekte ne aradığını, rakiplerin neyi yaptığını ve boşlukları çıkarırız." },
            { title: "3. Site mimarisi ve teknik temel", description: "Tedavi sayfaları, dil yapısı, hız, mobil deneyim ve yapılandırılmış veri düzenlenir." },
            { title: "4. İçerik ve kampanyalar", description: "Doğrulanmış içerik üretilir; SEO ile eş zamanlı olarak ücretli kampanyalar planlanır." },
            { title: "5. Ölçüm ve iyileştirme", description: "Talep kalitesini ölçer, düzenli raporlar sunar ve stratejiyi veriyle güncelleriz." },
        ],
        complianceTitle: "Mevzuat ve Platform Politikalarına Uyum",
        complianceIntro:
            "Sağlık hizmetlerinin tanıtımı hem Türkiye'de hem de reklam platformlarında kurallara bağlıdır. Çalışmaya başlarken şu başlıkları birlikte gözden geçiririz:",
        compliance: [
            "Uluslararası sağlık turizmi faaliyeti için sağlık tesisi ve aracı kuruluşların Sağlık Bakanlığı yetki belgesi gerekliliği",
            "Sağlık hizmetlerinde tanıtım ve bilgilendirme faaliyetlerini düzenleyen yönetmelik (hasta görselleri, memnuniyet paylaşımları, fiyat ve kampanya bilgisi gibi konularda sınırlar)",
            "Google Ads sağlık ve ilaç politikası ile Meta reklam standartları (kategoriye ve ülkeye göre değişen kısıtlar)",
            "KVKK kapsamında sağlık verisi ve izin yönetimi",
        ],
        complianceNote:
            "Bu bölüm hukuki danışmanlık değildir. Mevzuat zamanla değiştiği için güncel metinleri mevzuat.gov.tr üzerinden ve hukuk danışmanınızla doğrulamanızı öneririz.",
        readTitle: "İlgili Rehberlerimiz",
        read: [
            { label: "Sağlık turizmi SEO'su: klinikler ve hastaneler için yol haritası", href: "/blog/saglik-turizmi-seo-rehberi" },
            { label: "Sağlık turizminde çok dilli SEO ve hreflang rehberi", href: "/blog/saglik-turizmi-cok-dilli-seo-hreflang" },
            { label: "Sağlık turizmi reklamlarında Google ve Meta kuralları", href: "/blog/saglik-turizmi-reklam-kurallari-google-meta" },
            { label: "Teknik SEO denetimi nasıl yapılır?", href: "/blog/teknik-seo-denetimi-nasil-yapilir" },
        ],
        faqTitle: "Sağlık Turizmi SEO'su Hakkında Sıkça Sorulan Sorular",
        faq: [
            {
                question: "Sağlık turizmi SEO'su ne kadar sürede sonuç verir?",
                answer:
                    "Süre; rekabete, sitenizin mevcut durumuna ve hedef tedaviye göre değişir. Teknik düzeltmelerin etkisi birkaç hafta içinde görülebilir, ancak rekabetli tedavi kelimelerinde kalıcı sıralama ve talep artışı genellikle aylar sürer. Kimse belirli bir sıralamayı garanti edemez; biz ölçülebilir hedefler ve düzenli raporlama sunarız.",
            },
            {
                question: "Hangi dillerde çalışıyorsunuz?",
                answer:
                    "Kapsamı hedef pazarlarınıza göre belirliyoruz. Türkçe ve İngilizce temel dillerimizdir; Almanca, Arapça ve Rusça gibi diller için proje bazında planlama yapıp çevirilerin insan kontrolüyle yayınlanmasını sağlıyoruz.",
            },
            {
                question: "Hasta yorumlarını veya öncesi-sonrası fotoğraflarını kullanabilir miyiz?",
                answer:
                    "Sağlık hizmetlerinin tanıtımı yönetmelikle sınırlandırılmıştır ve kurallar zaman zaman güncellenmektedir. İçerik planını, güncel yönetmelik metnine ve hukuk danışmanınızın görüşüne göre kurgularız; kısıtlı konularda risk almayız.",
            },
            {
                question: "Sağlık sektörü için Google Ads ve Meta reklamı verilebilir mi?",
                answer:
                    "Çoğu durumda evet, ancak kurallar hizmet türüne ve hedef ülkeye göre değişir. Bazı kategorilerde ek doğrulama veya sertifikasyon gerekebilir. Kampanyaları kurmadan önce politikaları kontrol eder, reklam metinlerini ve açılış sayfalarını buna göre hazırlarız.",
            },
            {
                question: "Sadece Türkçe web sitesi yeterli mi?",
                answer:
                    "Yurt dışındaki hastalara ulaşmak istiyorsanız hedef pazarın dilinde, o pazarın arama davranışına göre hazırlanmış sayfalar gerekir. Yalnızca menü ve alt bilgiyi çevirmek yeterli değildir; ana içeriğin de ilgili dilde hazırlanması gerekir.",
            },
        ],
        ctaTitle: "Uluslararası Hasta Talebini Birlikte Büyütelim",
        ctaText: "Sitenizin mevcut durumunu inceleyelim, hedef pazarlarınıza göre bir yol haritası çıkaralım.",
        ctaButton: "Bize Ulaşın",
        ctaHref: "/iletisim",
    },
    en: {
        breadcrumbHome: "Home",
        breadcrumbServices: "Services",
        breadcrumbName: "Health Tourism Marketing",
        servicesPath: "/en/services",
        serviceDescription: "Multilingual SEO, Google Ads, Meta campaigns and measurement for clinics, hospitals and medical travel agencies.",
        serviceType: "Health tourism SEO and digital marketing",
        h1Lead: "Health Tourism SEO and",
        h1Highlight: "Digital Marketing for Clinics and Hospitals",
        intro:
            "We help clinics, hospitals and medical travel agencies get found on Google by international patients, build trust, and turn interest into enquiries. We combine multilingual SEO, Google Ads, Meta campaigns and measurement in a single strategy, taking regulation and platform policies into account from day one.",
        primaryCta: "Free SEO Analysis",
        primaryHref: "/en/seo-analysis",
        secondaryCta: "Get in Touch",
        secondaryHref: "/en/contact",
        whyTitle: "Why Is Digital Marketing Different in Health Tourism?",
        why: [
            {
                title: "A long, trust-driven decision",
                description:
                    "Patients research for a long time before choosing a treatment, comparing doctors, clinics, reviews and the process. Content, doctor profiles and transparent information build trust at every step of that journey.",
            },
            {
                title: "Multilingual, multi-market search",
                description:
                    "People in different countries search for the same treatment with different words. You need pages built around each market's search intent, not just translations, plus a correct hreflang setup.",
            },
            {
                title: "A higher quality bar for health content",
                description:
                    "Google expects content on topics that could significantly affect people's health to be highly accurate and consistent with expert consensus. That makes authorship, sources and physician information a basic requirement on health sites, not an extra.",
            },
        ],
        servicesTitle: "Our Health Tourism Services",
        servicesIntro:
            "We define scope together based on treatment type, target countries and the clinic's capacity. These are our main areas of work.",
        services: [
            {
                title: "Multilingual SEO and hreflang",
                features: [
                    "Keyword and intent research in your target market languages",
                    "Site architecture planning for languages such as EN / DE / AR / RU / TR (scope set per project)",
                    "Correct hreflang, canonical and sitemap setup",
                    "Translations published after human review",
                ],
            },
            {
                title: "Treatment and Department Page Architecture",
                features: [
                    "Pages focused on single treatments: hair transplant, dental, aesthetics, eye care, IVF, check-ups",
                    "Process, preparation, recovery and FAQ sections",
                    "City and country-level landing pages",
                    "Internal linking and topic clusters",
                ],
            },
            {
                title: "Local SEO and Google Business Profile",
                features: [
                    "Google Maps and business profile optimization for clinic locations",
                    "Consistent address, opening hours and contact details",
                    "Local schema and structured data",
                    "City-specific strategies such as Antalya and Istanbul",
                ],
            },
            {
                title: "Google Ads and Meta Campaigns",
                features: [
                    "Campaign setup aligned with healthcare ad policies",
                    "Country- and language-based account structure",
                    "Landing page and form improvement",
                    "Budget and bid optimization",
                ],
            },
            {
                title: "Content and E-E-A-T",
                features: [
                    "Doctor profiles and medical review notes",
                    "Fact-checked content with cited sources",
                    "Patient information guides",
                    "An editorial review process for health content",
                ],
            },
            {
                title: "Measurement and Reporting",
                features: [
                    "GA4 and Search Console setup",
                    "Tracking form, phone and WhatsApp conversions",
                    "Privacy-compliant tracking and consent management",
                    "Performance reports by country and language",
                ],
            },
        ],
        processTitle: "How We Work",
        process: [
            { title: "1. Discovery and compliance check", description: "We review your clinic, treatments, target countries and current site, and identify advertising and content restrictions." },
            { title: "2. Market and keyword research", description: "We map what patients actually search for in each market, what competitors do, and where the gaps are." },
            { title: "3. Site architecture and technical base", description: "Treatment pages, language structure, speed, mobile experience and structured data are put in order." },
            { title: "4. Content and campaigns", description: "We produce verified content and plan paid campaigns in parallel with SEO." },
            { title: "5. Measurement and improvement", description: "We measure enquiry quality, report regularly and update the strategy with data." },
        ],
        complianceTitle: "Regulation and Platform Policy Compliance",
        complianceIntro:
            "Promoting healthcare services is subject to rules both in Turkey and on ad platforms. At the start of an engagement we review these topics together:",
        compliance: [
            "The requirement for health facilities and intermediary agencies to hold an authorization certificate from the Turkish Ministry of Health for international health tourism activity",
            "The regulation governing promotion and information activities in health services (limits on patient images, satisfaction posts, pricing and campaign information)",
            "Google Ads' healthcare and medicines policy and Meta's ad standards (restrictions vary by category and country)",
            "Health data and consent management under Turkey's KVKK data protection law",
        ],
        complianceNote:
            "This section is not legal advice. Because regulation changes, we recommend verifying current texts on mevzuat.gov.tr and with your legal counsel.",
        readTitle: "Related Guides",
        read: [
            { label: "Health tourism SEO: a roadmap for clinics and hospitals", href: "/en/blog/health-tourism-seo-guide" },
            { label: "Multilingual SEO and hreflang for health tourism", href: "/en/blog/multilingual-seo-hreflang-health-tourism" },
            { label: "Google and Meta advertising rules for health tourism", href: "/en/blog/health-tourism-advertising-rules-google-meta" },
            { label: "How to run a technical SEO audit", href: "/en/blog/technical-seo-audit-guide" },
        ],
        faqTitle: "Health Tourism SEO: Frequently Asked Questions",
        faq: [
            {
                question: "How long does health tourism SEO take to work?",
                answer:
                    "It depends on competition, your site's current state and the target treatment. Technical fixes can show an effect within weeks, but lasting rankings and demand growth for competitive treatment terms usually take months. Nobody can guarantee a specific ranking; we offer measurable goals and regular reporting.",
            },
            {
                question: "Which languages do you work in?",
                answer:
                    "We set scope according to your target markets. Turkish and English are our core languages; for languages such as German, Arabic and Russian we plan per project and make sure translations are published after human review.",
            },
            {
                question: "Can we use patient reviews or before-and-after photos?",
                answer:
                    "The promotion of health services is restricted by regulation, and the rules are updated from time to time. We build the content plan around the current regulation text and your legal counsel's opinion, and we don't take risks on restricted topics.",
            },
            {
                question: "Can healthcare advertise on Google Ads and Meta?",
                answer:
                    "In many cases yes, but rules vary by service type and target country. Some categories may require extra verification or certification. Before setting up campaigns we check the policies and prepare ad copy and landing pages accordingly.",
            },
            {
                question: "Is a Turkish-only website enough?",
                answer:
                    "To reach patients abroad you need pages in the target market's language, written for that market's search behavior. Translating only the menu and footer isn't enough; the main content has to be in the relevant language too.",
            },
        ],
        ctaTitle: "Let's Grow International Patient Demand Together",
        ctaText: "We'll review your site's current state and build a roadmap around your target markets.",
        ctaButton: "Contact Us",
        ctaHref: "/en/contact",
    },
};

export function HealthTourismPage({ locale }: { locale: Locale }) {
    const c = CONTENT[locale];
    const path = HEALTH_TOURISM_PATHS[locale];
    const homePath = locale === "tr" ? "/" : "/en";

    return (
        <div className="bg-black min-h-screen">
            <JsonLd data={breadcrumbSchema([
                { name: c.breadcrumbHome, path: homePath },
                { name: c.breadcrumbServices, path: c.servicesPath },
                { name: c.breadcrumbName, path },
            ])} />
            <JsonLd data={serviceSchema({
                locale,
                name: c.breadcrumbName,
                description: c.serviceDescription,
                path,
                serviceType: c.serviceType,
            })} />
            <Header locale={locale} />

            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-black to-auryn-magenta/20"></div>
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {c.h1Lead}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                                {c.h1Highlight}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">{c.intro}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-auryn-magenta to-auryn-purple text-white" asChild>
                                <Link href={c.primaryHref}>
                                    {c.primaryCta}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                                <Link href={c.secondaryHref}>{c.secondaryCta}</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Why different */}
                <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.whyTitle}</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {c.why.map((item) => (
                                <div key={item.title} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-20 bg-black">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.servicesTitle}</h2>
                            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{c.servicesIntro}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {c.services.map((service, idx) => {
                                const Icon = ICONS[idx % ICONS.length];
                                return (
                                    <div key={service.title} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-auryn-magenta/50 transition-all">
                                        <Icon className="h-10 w-10 text-auryn-magenta mb-4" aria-hidden="true" />
                                        <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                                        <ul className="space-y-3">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-start text-gray-300">
                                                    <CheckCircle className="h-5 w-5 text-auryn-magenta mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                                    <span className="text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.processTitle}</h2>
                        </div>
                        <ol className="space-y-5">
                            {c.process.map((step) => (
                                <li key={step.title} className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6">
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-300">{step.description}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Compliance */}
                <section className="py-20 bg-black">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck className="h-8 w-8 text-auryn-magenta" aria-hidden="true" />
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{c.complianceTitle}</h2>
                            </div>
                            <p className="text-gray-300 mb-6">{c.complianceIntro}</p>
                            <ul className="space-y-3 mb-6">
                                {c.compliance.map((item) => (
                                    <li key={item} className="flex items-start text-gray-300">
                                        <CheckCircle className="h-5 w-5 text-auryn-magenta mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm text-gray-500">{c.complianceNote}</p>
                        </div>
                    </div>
                </section>

                {/* Related guides */}
                <section className="py-16 bg-black">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{c.readTitle}</h2>
                        <ul className="space-y-3">
                            {c.read.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="inline-flex items-center text-gray-300 hover:text-auryn-magenta transition-colors">
                                        <ArrowRight className="h-4 w-4 mr-2 text-auryn-magenta" aria-hidden="true" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.faqTitle}</h2>
                        </div>
                        <div className="space-y-4">
                            {c.faq.map((item) => (
                                <details key={item.question} className="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-semibold hover:bg-gray-800/70 transition-colors">
                                        <span>{item.question}</span>
                                        <ChevronDown className="h-5 w-5 flex-shrink-0 ml-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-300">{item.answer}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-r from-auryn-magenta to-auryn-purple">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{c.ctaTitle}</h2>
                        <p className="text-xl text-white/90 mb-8">{c.ctaText}</p>
                        <Button size="lg" className="bg-white text-auryn-magenta hover:bg-gray-100" asChild>
                            <Link href={c.ctaHref}>
                                {c.ctaButton}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer locale={locale} />
        </div>
    );
}
