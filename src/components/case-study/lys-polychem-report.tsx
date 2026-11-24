import type { Locale } from "@/lib/i18n/routes";
import {
    BarList,
    Callout,
    COLORS,
    CompareBars,
    Funnel,
    KpiGrid,
    Panel,
    PositionStrip,
    ReportSection,
    ScoreBars,
    StackedShare,
} from "./chart-primitives";

/**
 * Lys Polychem annual digital performance report (20 Jul 2025 - 12 Aug 2026).
 * All figures come from the client report prepared by Auryn Dijital on
 * 14 Aug 2026 (GA4, Google Ads, Search Console, Semrush, PageSpeed Insights)
 * and the June-July 2025 baseline snapshot. Derived values (shares, CTR per
 * query) are computed from those figures. Campaign names, spend and
 * client-sensitive details are intentionally left out.
 */
export function LysPolychemReport({ locale }: { locale: Locale }) {
    const tr = locale === "tr";
    const t = (a: string, b: string) => (tr ? a : b);
    const nf = new Intl.NumberFormat(tr ? "tr-TR" : "en-US");
    const dec = (x: number, d = 1) =>
        new Intl.NumberFormat(tr ? "tr-TR" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d }).format(x);
    const n = (x: number) => nf.format(x);
    const pct = (x: number, d = 1) => (tr ? `%${dec(x, d)}` : `${dec(x, d)}%`);
    const tl = (x: number, d = 2) => (tr ? `${dec(x, d)} TL` : `TRY ${dec(x, d)}`);

    return (
        <div lang={locale}>
            {/* 1. SUMMARY */}
            <ReportSection
                id="ozet"
                eyebrow={t("Özet", "Summary")}
                title={t("Sıfıra yakın bir başlangıçtan ölçülebilir görünürlüğe", "From a near-zero start to measurable visibility")}
                intro={
                    <>
                        <p className="mb-3">
                            {t(
                                "Lys Polychem; PVC kompaundları ile halojensiz (HFFR/LSZH) kablo kompaundları üreten, ihracat odaklı bir endüstriyel üreticidir. Bu çalışma, markanın dijital varlığının Temmuz 2025'ten Ağustos 2026'ya kadar nasıl geliştiğini Google Analytics 4, Google Ads, Search Console, Semrush ve PageSpeed Insights verileriyle ortaya koyar.",
                                "Lys Polychem is an export-focused industrial manufacturer of PVC compounds and halogen-free (HFFR/LSZH) cable compounds. This case study shows how the brand's digital presence developed from July 2025 to August 2026, using Google Analytics 4, Google Ads, Search Console, Semrush and PageSpeed Insights data.",
                            )}
                        </p>
                        <p>
                            {t(
                                "Kapsam: Google Ads yönetimi, SEO ve içerik performansının izlenmesi, dönüşüm ölçümü ve düzenli raporlama.",
                                "Scope: Google Ads management, SEO and content performance tracking, conversion measurement and regular reporting.",
                            )}
                        </p>
                    </>
                }
            >
                <KpiGrid
                    items={[
                        { value: "21,9K", label: t("Aktif kullanıcı", "Active users"), sub: t("GA4, 1 Tem 2025 – 27 Tem 2026", "GA4, 1 Jul 2025 – 27 Jul 2026") },
                        { value: n(27003), label: t("Reklam tıklaması", "Ad clicks"), sub: "Google Ads" },
                        { value: n(123949), label: t("Organik gösterim", "Organic impressions"), sub: t("Search Console", "Search Console") },
                        { value: n(258), label: t("Tamamlanan form", "Completed forms"), sub: t("144 farklı kullanıcıdan", "from 144 distinct users") },
                    ]}
                />
                <Callout>
                    <strong>{t("Yılın öne çıkan sonucu: ", "Result of the year: ")}</strong>
                    {t(
                        "“Ayakkabı için PVC Granül Bileşikleri” blog yazısı, “pvc taban nedir” aramasında Semrush takibinde 100. sıradan 1. sıraya yükseldi.",
                        "The blog post “PVC Granule Compounds for Footwear” rose from position 100 to position 1 for “pvc taban nedir” in Semrush tracking.",
                    )}
                </Callout>
            </ReportSection>

            {/* 2. BEFORE / AFTER */}
            <ReportSection
                id="baslangic"
                eyebrow={t("Başlangıç ve bugün", "Then and now")}
                title={t("Başlangıç ölçümü ile bir yıl sonrası", "The starting snapshot versus a year later")}
                intro={t(
                    "Haziran–Temmuz 2025'te (yaklaşık 4 haftalık) alınan başlangıç ölçümü ile yıllık dönemin rakamları yan yana. Dönem uzunlukları farklı olduğu için hacim rakamları birebir kıyaslanmamalı; verimlilik oranları ise kıyaslanabilir.",
                    "The June–July 2025 baseline (about four weeks) next to the full-year figures. Because the periods differ in length, volume figures should not be compared one-to-one; efficiency rates can be.",
                )}
            >
                <Panel title={t("Dönem tablosu", "Period table")}>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[480px] text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                                    <th className="py-2 pr-4 font-semibold">{t("Metrik", "Metric")}</th>
                                    <th className="py-2 pr-4 font-semibold">{t("Başlangıç (Haz–Tem 2025, ~4 hf.)", "Baseline (Jun–Jul 2025, ~4 wks)")}</th>
                                    <th className="py-2 font-semibold">{t("Yıllık dönem", "Full year")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 tabular-nums">
                                {[
                                    [t("Aktif kullanıcı", "Active users"), n(307), "21,9K"],
                                    [t("Reklam tıklaması", "Ad clicks"), n(110), n(27003)],
                                    [t("Reklam gösterimi", "Ad impressions"), n(4910), n(900321)],
                                    [t("Ortalama TBM", "Average CPC"), tl(58.88), tl(5.75)],
                                    [t("Tıklama oranı", "Click-through rate"), pct(2.24, 2), pct(3.0, 2)],
                                ].map((r) => (
                                    <tr key={r[0]}>
                                        <td className="py-2.5 pr-4 font-medium text-gray-900">{r[0]}</td>
                                        <td className="py-2.5 pr-4 text-gray-600">{r[1]}</td>
                                        <td className="py-2.5 font-semibold text-gray-900">{r[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Panel>

                <Panel
                    title={t("Verimlilik oranları", "Efficiency rates")}
                    note={t(
                        "Not: Başlangıç ölçümü arama ağı ağırlıklıydı; sonraki dönemde Performance Max kampanyaları tıklamaların büyük kısmını taşıdı. Kampanya türü ve hedefleme değiştiği için bu bir birebir (aynı koşul) karşılaştırması değil, hesabın genel verimlilik yönünü gösterir.",
                        "Note: the baseline was search-network heavy; later, Performance Max campaigns carried most clicks. Because campaign type and targeting changed, this is not a like-for-like comparison but shows the account's overall efficiency direction.",
                    )}
                >
                    <CompareBars
                        beforeName={t("Başlangıç (2025)", "Baseline (2025)")}
                        afterName={t("Yıllık dönem", "Full year")}
                        rows={[
                            {
                                label: t("Ortalama tıklama başı maliyet (TL)", "Average cost per click (TRY)"),
                                before: 58.88,
                                after: 5.75,
                                beforeLabel: tl(58.88),
                                afterLabel: tl(5.75),
                                delta: tr ? "−%90" : "−90%",
                                lowerIsBetter: true,
                            },
                            {
                                label: t("Tıklama oranı", "Click-through rate"),
                                before: 2.24,
                                after: 3.0,
                                beforeLabel: pct(2.24, 2),
                                afterLabel: pct(3.0, 2),
                                delta: tr ? "+0,76 puan" : "+0.76 pts",
                            },
                        ]}
                    />
                </Panel>
            </ReportSection>

            {/* 3. TRAFFIC */}
            <ReportSection
                id="trafik"
                eyebrow={t("Site trafiği", "Site traffic")}
                title={t("Trafik nereden geldi?", "Where did the traffic come from?")}
                intro={t(
                    "Oturumların yaklaşık yedide beşi ücretli aramadan geldi. Organik arama ve sektör sitelerinden gelen yönlendirmeler ikinci ayağı oluşturdu. Bu dağılım, ücretli ve organik kanalın birbirini tamamlaması gerektiğini gösteriyor.",
                    "Roughly seven in ten sessions came from paid search. Organic search and referrals from industry sites formed the second leg. The mix shows paid and organic channels need to complement each other.",
                )}
            >
                <Panel
                    title={t("Oturumların kaynağa göre dağılımı", "Sessions by source")}
                    note={t("Kaynak: GA4, 1 Temmuz 2025 – 27 Temmuz 2026. “Diğer”, listelenmeyen kaynakların toplamıdır.", "Source: GA4, 1 July 2025 – 27 July 2026. “Other” is the sum of unlisted sources.")}
                >
                    <StackedShare
                        segments={[
                            { label: "google / cpc", pct: 69.2, valueLabel: `${n(18517)} · ${pct(69.2)}`, color: COLORS.brand },
                            { label: t("Doğrudan", "Direct"), pct: 12.2, valueLabel: `${n(3264)} · ${pct(12.2)}`, color: COLORS.purple },
                            { label: "google / organic", pct: 10.8, valueLabel: `${n(2891)} · ${pct(10.8)}`, color: COLORS.good },
                            { label: "plasteurasia.com", pct: 1.4, valueLabel: `${n(376)} · ${pct(1.4)}`, color: COLORS.warn },
                            { label: "k-online.com", pct: 0.5, valueLabel: `${n(138)} · ${pct(0.5)}`, color: "#0ea5e9" },
                            { label: t("Diğer", "Other"), pct: 5.9, valueLabel: pct(5.9), color: "#9ca3af" },
                        ]}
                    />
                </Panel>
                <KpiGrid
                    cols={3}
                    items={[
                        { value: pct(75.7), label: t("Masaüstü payı", "Desktop share"), sub: t("Teknik/endüstriyel alıcı davranışıyla tutarlı", "Consistent with technical/industrial buyers") },
                        { value: pct(98, 0), label: t("Yeni ziyaretçi", "New visitors"), sub: t("Tekrar eden ziyaretçi tabanı geliştirilecek alan", "Returning-visitor base is an area to grow") },
                        { value: "7", label: t("Öne çıkan ülke", "Top countries"), sub: t("Türkiye, Almanya, Çin, Singapur, ABD, Avusturya, Hindistan", "Türkiye, Germany, China, Singapore, USA, Austria, India") },
                    ]}
                />
            </ReportSection>

            {/* 4. GOOGLE ADS */}
            <ReportSection
                id="google-ads"
                eyebrow="Google Ads"
                title={t("Reklam performansı", "Ad performance")}
                intro={t(
                    "Performance Max kampanyaları tıklamaların %95'inden fazlasını taşıdı. Aynı dönemde ortalama tıklama başı maliyet yaklaşık %90 düştü, tıklama oranı yükseldi.",
                    "Performance Max campaigns carried more than 95% of clicks. Over the same period average cost per click fell by about 90% while click-through rate rose.",
                )}
            >
                <KpiGrid
                    items={[
                        { value: n(27003), label: t("Tıklama", "Clicks") },
                        { value: n(900321), label: t("Gösterim", "Impressions") },
                        { value: tl(5.75), label: t("Ort. TBM", "Avg. CPC"), sub: t("Başlangıçta 58,88 TL", "58.88 TL at the start") },
                        { value: pct(3.0, 2), label: t("Tıklama oranı", "CTR"), sub: t("Başlangıçta %2,24", "2.24% at the start") },
                    ]}
                />
            </ReportSection>

            {/* 5. CONVERSIONS */}
            <ReportSection
                id="donusum"
                eyebrow={t("Dönüşüm", "Conversion")}
                title={t("Trafikten taleplere", "From traffic to enquiries")}
                intro={t(
                    "B2B bir ürün grubu için asıl ölçüt trafik değil, niyet taşıyan taleptir. İletişim formu üzerinden dönemde 258 form tamamlandı ve 144 farklı kullanıcı talep gönderdi.",
                    "For a B2B product range the real measure is not traffic but intent-bearing enquiries. In the period 258 forms were completed and 144 distinct users sent an enquiry.",
                )}
            >
                <Panel
                    title={t("İletişim formu hunisi", "Contact form funnel")}
                    note={t("Form başlatma → tamamlama oranı yaklaşık %20,4. Kaynak: GA4.", "Form start → completion rate is about 20.4%. Source: GA4.")}
                >
                    <Funnel
                        steps={[
                            { label: t("Form başlatıldı", "Forms started"), value: 1263, valueLabel: n(1263) },
                            { label: t("Form tamamlandı", "Forms completed"), value: 258, valueLabel: n(258) },
                            { label: t("Talep gönderen farklı kullanıcı", "Distinct users who sent an enquiry"), value: 144, valueLabel: n(144) },
                        ]}
                    />
                </Panel>
            </ReportSection>

            {/* 6. SEO */}
            <ReportSection
                id="seo"
                eyebrow="SEO · Search Console"
                title={t("Organik görünürlük", "Organic visibility")}
                intro={t(
                    "Site, dönem boyunca 1.750'den fazla farklı sorguda göründü. Marka sorgusu neredeyse her aramada ilk sırada; sektörel genel terimlerde ise yüksek gösterim ve düşük tıklama oranı, başlık ve açıklama optimizasyonu için net bir fırsat sunuyor.",
                    "The site appeared for more than 1,750 distinct queries during the period. The brand query ranks first in almost every search; for generic industry terms, high impressions with a low click-through rate is a clear opportunity for title and description optimisation.",
                )}
            >
                <KpiGrid
                    items={[
                        { value: n(123949), label: t("Gösterim", "Impressions") },
                        { value: n(2075), label: t("Tıklama", "Clicks") },
                        { value: pct(1.67, 2), label: t("Ortalama TO", "Average CTR") },
                        { value: dec(16.66, 2), label: t("Ort. pozisyon", "Avg. position"), sub: t("Önceki döneme göre %50,8 iyileşme", "50.8% better than the previous period") },
                    ]}
                />
                <Panel
                    title={t("Öne çıkan sorgular", "Top queries")}
                    note={t("Tıklama oranı, tıklama ÷ gösterim olarak hesaplanmıştır. Kaynak: Search Console, 20 Temmuz 2025 – 27 Temmuz 2026.", "Click-through rate is calculated as clicks ÷ impressions. Source: Search Console, 20 July 2025 – 27 July 2026.")}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px] text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                                    <th className="py-2 pr-3 font-semibold">{t("Sorgu", "Query")}</th>
                                    <th className="py-2 pr-3 font-semibold">{t("Gösterim", "Impr.")}</th>
                                    <th className="py-2 pr-3 font-semibold">{t("Tıklama", "Clicks")}</th>
                                    <th className="py-2 pr-3 font-semibold">{t("TO", "CTR")}</th>
                                    <th className="py-2 font-semibold">{t("Ort. poz.", "Avg. pos.")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 tabular-nums">
                                {[
                                    ["lys polychem", 1227, 541, 1.12],
                                    ["hffr", 1711, 30, 22.57],
                                    ["pvc compound", 9841, 18, 13.87],
                                    ["hffr compound", 532, 17, 14.92],
                                    ["polychem", 1877, 8, 10.72],
                                ].map(([q, imp, clk, pos]) => (
                                    <tr key={q as string}>
                                        <td className="py-2.5 pr-3 font-medium text-gray-900">{q}</td>
                                        <td className="py-2.5 pr-3 text-gray-700">{n(imp as number)}</td>
                                        <td className="py-2.5 pr-3 font-semibold text-gray-900">{n(clk as number)}</td>
                                        <td className="py-2.5 pr-3 text-gray-700">{pct(((clk as number) / (imp as number)) * 100, 2)}</td>
                                        <td className="py-2.5 text-gray-700">{dec(pos as number, 2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Panel>
                <Panel title={t("Gösterim hacmi (öne çıkan sorgular)", "Impression volume (top queries)")}>
                    <BarList
                        rows={[
                            { label: "pvc compound", value: 9841, valueLabel: n(9841), color: COLORS.purple },
                            { label: "polychem", value: 1877, valueLabel: n(1877), color: COLORS.purple },
                            { label: "hffr", value: 1711, valueLabel: n(1711), color: COLORS.purple },
                            { label: "lys polychem", value: 1227, valueLabel: n(1227), color: COLORS.brand },
                            { label: "hffr compound", value: 532, valueLabel: n(532), color: COLORS.purple },
                        ]}
                    />
                </Panel>
            </ReportSection>

            {/* 7. SEMRUSH */}
            <ReportSection
                id="siralama"
                eyebrow={t("Organik sıralama · Semrush", "Organic rankings · Semrush")}
                title={t("Hedef kelimelerde ilk sıralar", "Top positions on target keywords")}
                intro={t(
                    "Semrush Position Tracking, 7 kelimelik bir hedef seti masaüstü, Türkiye (Google) sonuçlarında 29 Nisan – 12 Ağustos 2026 arasında izledi. Takip edilen kelimelerin 6'sı ilk 10'da, 4'ü ilk 3'te yer aldı.",
                    "Semrush Position Tracking monitored a 7-keyword target set on desktop, Türkiye (Google) from 29 April to 12 August 2026. Six of the tracked keywords ranked in the top 10 and four in the top 3.",
                )}
            >
                <Panel>
                    <div className="flex flex-col items-center gap-2 py-2 text-center sm:flex-row sm:justify-center sm:gap-8">
                        <div>
                            <div className="text-5xl font-bold tabular-nums text-gray-400">100</div>
                            <div className="text-xs text-gray-500">{t("Başlangıç pozisyonu", "Starting position")}</div>
                        </div>
                        <div className="text-3xl text-gray-300" aria-hidden="true">→</div>
                        <div>
                            <div className="text-6xl font-bold tabular-nums text-auryn-magenta">1</div>
                            <div className="text-xs text-gray-500">{t("12 Ağustos 2026", "12 August 2026")}</div>
                        </div>
                        <div className="max-w-xs text-sm text-gray-700 sm:text-left">
                            <strong className="text-gray-900">“pvc taban nedir”</strong>{" "}
                            {t("aramasında +99 pozisyon; tahmini organik trafik 0'dan 2,55'e.", "— +99 positions; estimated organic traffic from 0 to 2.55.")}
                        </div>
                    </div>
                </Panel>

                <KpiGrid
                    items={[
                        { value: "4", label: t("İlk 3'teki kelime", "Keywords in top 3") },
                        { value: "6 / 7", label: t("İlk 10'daki kelime", "Keywords in top 10") },
                        { value: dec(17.14, 2), label: t("Ort. pozisyon", "Avg. position"), sub: t("13,72 sıra iyileşme", "13.72 positions better") },
                        { value: "3 / 7", label: t("AI Overview'da kaynak", "Cited in AI Overview"), sub: t("Site doğrudan kaynak gösteriliyor", "The site is cited directly") },
                    ]}
                />

                <Panel title={t("Öne çıkan kelime sıralamaları", "Highlighted keyword rankings")}>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[320px] text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                                    <th className="py-2 pr-3 font-semibold">{t("Kelime", "Keyword")}</th>
                                    <th className="py-2 pr-3 font-semibold">{t("Önce", "Before")}</th>
                                    <th className="py-2 pr-3 font-semibold">{t("Şimdi", "Now")}</th>
                                    <th className="py-2 font-semibold">{t("Değişim", "Change")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 tabular-nums">
                                {[
                                    ["pvc taban nedir", 100, 1],
                                    ["lszh kablo", 5, 2],
                                    ["halogen free nedir", 8, 6],
                                    ["hffr", 1, 1],
                                ].map(([k, b, a]) => {
                                    const d = (b as number) - (a as number);
                                    return (
                                        <tr key={k as string}>
                                            <td className="py-2.5 pr-3 font-medium text-gray-900">{k}</td>
                                            <td className="py-2.5 pr-3 text-gray-500">{b}</td>
                                            <td className="py-2.5 pr-3 font-bold text-gray-900">{a}</td>
                                            <td className="py-2.5 font-semibold" style={{ color: d > 0 ? COLORS.good : COLORS.muted }}>
                                                {d > 0 ? `▲ ${d}` : t("1. sırada korundu", "Held #1")}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Panel>

                <KpiGrid
                    cols={3}
                    items={[
                        { value: "7 / 7", label: t("“People also ask” tetikleyen", "Triggering “People also ask”"), sub: t("Soru-cevap içerik için fırsat", "An opportunity for Q&A content") },
                        { value: "40", label: t("TR blog yazısı", "TR blog posts"), sub: t("Envanteri çıkarıldı, içerik planı hazırlandı", "Inventoried, content plan prepared") },
                        { value: n(1750) + "+", label: t("Görünür olunan sorgu", "Queries appeared for"), sub: "Search Console" },
                    ]}
                />
            </ReportSection>

            {/* 7b. KEYWORD POSITIONS 2025 -> 2026 */}
            <ReportSection
                id="pozisyon-kiyas"
                eyebrow={t("Anahtar kelime pozisyonları", "Keyword positions")}
                title={t("Temmuz 2025'ten Kasım 2026'ya pozisyon değişimi", "Position change from July 2025 to November 2026")}
                intro={t(
                    "Başlangıç raporundaki (Haziran–Temmuz 2025) Search Console sorgu pozisyonları ile son rapordaki (25 Ekim – 23 Kasım 2026) pozisyonlar aynı 1–100 ölçeğinde yan yana. Başlangıçta sorguların hiçbiri ilk 10'da değildi; bugün sitenin öne çıkan sorgularının çoğu ilk 10'da, bir kısmı 1–2. sırada.",
                    "Search Console query positions from the baseline report (June–July 2025) and the latest report (25 October – 23 November 2026) side by side on the same 1–100 scale. At the start none of the queries were in the top 10; today most of the site's standout queries are in the top 10, and several are in positions 1–2.",
                )}
            >
                <KpiGrid
                    cols={3}
                    items={[
                        { value: tr ? "≈33,9 → 12,4" : "≈33.9 → 12.4", label: t("Ortalama pozisyon", "Average position"), sub: t("Önceki 12 ay → Kasım 2026 (Search Console)", "Previous 12 months → November 2026 (Search Console)") },
                        { value: "9 → 560", label: t("Görünür olunan sorgu", "Queries appeared for"), sub: t("Temmuz 2025 → Ekim–Kasım 2026", "July 2025 → Oct–Nov 2026") },
                        { value: n(14204), label: t("Aylık organik gösterim", "Monthly organic impressions"), sub: t("Temmuz 2025'te 55 (Almanya filtreli)", "55 in July 2025 (Germany filter)") },
                    ]}
                />

                <Panel
                    title={t("Ortalama pozisyon (Search Console, düşük sayı = daha iyi)", "Average position (Search Console, lower number = better)")}
                    note={t(
                        "İlk değer, 2025–2026 raporundaki “%50,8 iyileşme” bilgisinden geriye hesaplanmış yaklaşık değerdir (16,66 ÷ 0,492). Üç değer farklı uzunlukta dönemleri kapsar.",
                        "The first value is approximated backwards from the “50.8% improvement” in the 2025–2026 report (16.66 ÷ 0.492). The three values cover periods of different lengths.",
                    )}
                >
                    <BarList
                        max={40}
                        rows={[
                            { label: t("Önceki 12 ay (≈)", "Previous 12 months (≈)"), value: 33.86, valueLabel: "≈" + dec(33.9, 1), color: "#9ca3af" },
                            { label: t("Temmuz 2025 – Temmuz 2026", "July 2025 – July 2026"), value: 16.66, valueLabel: dec(16.66, 2), color: COLORS.purple },
                            { label: t("25 Ekim – 23 Kasım 2026", "25 Oct – 23 Nov 2026"), value: 12.36, valueLabel: dec(12.36, 2), color: COLORS.brand },
                        ]}
                    />
                </Panel>

                <Panel
                    title={t("Sorgu pozisyonları: iki rapor, aynı ölçek", "Query positions: two reports, one scale")}
                    note={t(
                        "Temmuz 2025 verisi Almanya filtreli ve yalnızca 55 gösterimden oluşuyor; Kasım 2026 verisi tüm ülkeleri kapsıyor ve 560 sorgu arasından marka ve ürün/konu sorgularından seçilmiş öne çıkan örnekleri gösteriyor. İki küme birebir aynı sorgulardan oluşmadığı için bu grafik tek tek sorgu kıyası değil, sitenin sıralama konumundaki genel kaymayı gösterir.",
                        "The July 2025 data is Germany-filtered and consists of only 55 impressions; the November 2026 data covers all countries and shows selected standout brand and product/topic queries out of 560 queries. Because the two sets are not made of exactly the same queries, this chart shows the overall shift in the site's ranking position, not a query-by-query comparison.",
                    )}
                >
                    <PositionStrip
                        countLabel={t("sorgu", "queries")}
                        rows={[
                            {
                                name: t("Temmuz 2025 (Almanya filtreli)", "July 2025 (Germany filter)"),
                                color: "#9ca3af",
                                points: [
                                    { label: "hffr", pos: 71.1 },
                                    { label: "hffr cable", pos: 47 },
                                    { label: "hffr cable compounding", pos: 10.75 },
                                    { label: "hffr compound formulation", pos: 24.25 },
                                    { label: "hffr material", pos: 26.25 },
                                    { label: "hffr cable compound", pos: 31.67 },
                                    { label: "pvc-compounds", pos: 90.67 },
                                    { label: "hffr kabel compounds", pos: 56 },
                                    { label: "hffr kunststoff", pos: 17 },
                                ],
                            },
                            {
                                name: t("Ekim–Kasım 2026 (tüm ülkeler)", "Oct–Nov 2026 (all countries)"),
                                color: COLORS.brand,
                                points: [
                                    { label: "lys polychem", pos: 1.02 },
                                    { label: "hffr nedir", pos: 1.65 },
                                    { label: "lszh kablo", pos: 2.33 },
                                    { label: "hffr kablo", pos: 4.36 },
                                    { label: "ayakkabı pvc nedir", pos: 4.42 },
                                    { label: "ayakkabıda pvc ne demek", pos: 4.43 },
                                    { label: "granür nedir", pos: 6.88 },
                                    { label: "granül plastik", pos: 7.29 },
                                    { label: "polychem", pos: 7.3 },
                                    { label: "granül", pos: 8.79 },
                                    { label: "hffr kablo nedir", pos: 13.2 },
                                ],
                            },
                        ]}
                    />
                </Panel>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Panel title={t("Temmuz 2025: başlangıç sorguları", "July 2025: starting queries")}>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[260px] text-sm tabular-nums">
                                <thead>
                                    <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                                        <th className="py-2 pr-3 font-semibold">{t("Sorgu", "Query")}</th>
                                        <th className="py-2 font-semibold">{t("Ort. poz.", "Avg. pos.")}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ["hffr cable compounding", 10.75],
                                        ["hffr kunststoff", 17],
                                        ["hffr compound formulation", 24.25],
                                        ["hffr material", 26.25],
                                        ["hffr cable compound", 31.67],
                                        ["hffr cable", 47],
                                        ["hffr kabel compounds", 56],
                                        ["hffr", 71.1],
                                        ["pvc-compounds", 90.67],
                                    ].map(([q, pos]) => (
                                        <tr key={q as string}>
                                            <td className="py-2 pr-3 font-medium text-gray-900">{q}</td>
                                            <td className="py-2 text-gray-600">{dec(pos as number, 2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Panel>
                    <Panel title={t("Ekim–Kasım 2026: öne çıkan sorgular", "Oct–Nov 2026: standout queries")}>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[320px] text-sm tabular-nums">
                                <thead>
                                    <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                                        <th className="py-2 pr-3 font-semibold">{t("Sorgu", "Query")}</th>
                                        <th className="py-2 pr-3 font-semibold">{t("Gösterim", "Impr.")}</th>
                                        <th className="py-2 font-semibold">{t("Ort. poz.", "Avg. pos.")}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ["lys polychem", 47, 1.02],
                                        ["hffr nedir", 37, 1.65],
                                        ["lszh kablo", 78, 2.33],
                                        ["hffr kablo", 88, 4.36],
                                        ["ayakkabı pvc nedir", 26, 4.42],
                                        ["ayakkabıda pvc ne demek", 68, 4.43],
                                        ["granür nedir", 396, 6.88],
                                        ["granül plastik", 93, 7.29],
                                        ["polychem", 54, 7.3],
                                        ["granül", 1573, 8.79],
                                    ].map(([q, imp, pos]) => (
                                        <tr key={q as string}>
                                            <td className="py-2 pr-3 font-medium text-gray-900">{q}</td>
                                            <td className="py-2 pr-3 text-gray-600">{n(imp as number)}</td>
                                            <td className="py-2 font-bold text-gray-900">{dec(pos as number, 2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Panel>
                </div>
                <Callout>
                    {t(
                        "“lszh kablo” sorgusu Semrush takibinde Nisan 2026'da 5. sıradan Ağustos'ta 2. sıraya yükselmişti; Kasım 2026 Search Console verisinde ortalama 2,33 ile bu konum korunuyor.",
                        "The query “lszh kablo” rose from position 5 in April 2026 to position 2 in August in Semrush tracking; in the November 2026 Search Console data it holds that position at an average of 2.33.",
                    )}
                </Callout>
            </ReportSection>

            {/* 8. TECHNICAL */}
            <ReportSection
                id="teknik"
                eyebrow={t("Teknik sağlık · PageSpeed", "Technical health · PageSpeed")}
                title={t("Site hızı ve teknik skorlar", "Site speed and technical scores")}
                intro={t(
                    "Erişilebilirlik, en iyi uygulamalar ve SEO skorları hem mobilde hem masaüstünde 90'ın üzerinde.",
                    "Accessibility, best-practice and SEO scores are above 90 on both mobile and desktop.",
                )}
            >
                <Panel
                    title={t("Google PageSpeed Insights skorları (0–100)", "Google PageSpeed Insights scores (0–100)")}
                    note={t("Test tarihi: 14 Ağustos 2026.", "Test date: 14 August 2026.")}
                >
                    <ScoreBars
                        mobileName={t("Mobil", "Mobile")}
                        desktopName={t("Masaüstü", "Desktop")}
                        rows={[
                            { label: t("Erişilebilirlik", "Accessibility"), mobile: 92, desktop: 92 },
                            { label: t("En iyi uygulamalar", "Best practices"), mobile: 96, desktop: 96 },
                            { label: "SEO", mobile: 92, desktop: 92 },
                        ]}
                    />
                </Panel>
            </ReportSection>

            {/* 9. NEXT STEPS */}
            <ReportSection
                id="sonraki-adimlar"
                eyebrow={t("Sonraki adımlar", "Next steps")}
                title={t("Büyümeyi sürdürmek için", "To keep the growth going")}
            >
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            h: t("Hız ve deneyim", "Speed and experience"),
                            items: [
                                t("Mobil performans optimizasyonu", "Mobile performance optimisation"),
                                t("Görsel ve önbellek iyileştirmeleri", "Image and caching improvements"),
                            ],
                        },
                        {
                            h: "Google Ads",
                            items: [
                                t("Marka aramalarını koruyan kampanya yapısı", "A campaign structure that protects brand searches"),
                                t("Dönüşüm sinyallerinin zenginleştirilmesi", "Enriching conversion signals"),
                            ],
                        },
                        {
                            h: "SEO & " + t("içerik", "content"),
                            items: [
                                t("Yüksek gösterimli sektör terimlerinde başlık ve açıklama optimizasyonu", "Title and description optimisation on high-impression industry terms"),
                                t("AI Overview ve PAA için soru-cevap içerik yapısı", "Q&A content structure for AI Overview and PAA"),
                            ],
                        },
                    ].map((col) => (
                        <div key={col.h} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h3 className="mb-3 text-base font-bold text-gray-900">{col.h}</h3>
                            <ul className="space-y-2 text-sm leading-relaxed text-gray-700">
                                {col.items.map((i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-auryn-magenta" />
                                        <span>{i}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="text-xs leading-relaxed text-gray-500">
                    {t(
                        "Kaynaklar: Google Analytics 4, Google Ads, Google Search Console (Haziran 2025 – Kasım 2026), Semrush Position Tracking (29 Nisan – 12 Ağustos 2026, masaüstü, Türkiye), Google PageSpeed Insights (14 Ağustos 2026) Haziran–Temmuz 2025 başlangıç ölçümü ve 25 Ekim – 23 Kasım 2026 güncel ölçümü. Önceki dönem neredeyse sıfır olduğundan yüzdesel büyüme oranları yerine mutlak rakamlar paylaşılmıştır.",
                        "Sources: Google Analytics 4, Google Ads, Google Search Console (June 2025 – November 2026), Semrush Position Tracking (29 April – 12 August 2026, desktop, Türkiye), Google PageSpeed Insights (14 August 2026) the June–July 2025 baseline snapshot and the 25 October – 23 November 2026 update. Because the previous period was close to zero, absolute figures are shown instead of percentage growth rates.",
                    )}
                </p>
            </ReportSection>
        </div>
    );
}
