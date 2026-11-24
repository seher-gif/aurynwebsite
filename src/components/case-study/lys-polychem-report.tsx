import type { Locale } from "@/lib/i18n/routes";
import {
    BarList,
    Callout,
    COLORS,
    CompareBars,
    DivergingBars,
    Funnel,
    KpiGrid,
    Panel,
    ReportSection,
    ScoreBars,
    StackedShare,
} from "./chart-primitives";

/**
 * Lys Polychem annual digital performance report (20 Jul 2025 - 12 Aug 2026).
 * All figures come from the client report prepared by Auryn Dijital on
 * 14 Aug 2026 (GA4, Google Ads, Search Console, Semrush, PageSpeed Insights)
 * and the June-July 2025 baseline snapshot. Derived values (shares, CTR per
 * query, approximate spend share) are computed from those figures and labelled.
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

    // ---- Google Ads campaign data ----
    const campaigns = [
        { name: "Auryn-İletisim-Pmax", clicks: 25825, cpc: 4.06 },
        { name: "Auryn_DE_DE_AT_Pmax", clicks: 1126, cpc: 34.76 },
        { name: "Auryn-Search-DE-AT", clicks: 52, cpc: 217.66 },
    ];
    const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0); // 27,003
    const spendEst = campaigns.map((c) => c.clicks * c.cpc);
    const spendTotal = spendEst.reduce((s, v) => s + v, 0);
    const campColors = [COLORS.brand, COLORS.purple, COLORS.warn];

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
                        { value: n(27003), label: t("Reklam tıklaması", "Ad clicks"), sub: t("Google Ads, 155.278 TL harcama", "Google Ads, 155,278 TL spend") },
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
                                    [t("Reklam harcaması", "Ad spend"), tl(6477.18), tl(155278, 0)],
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
                title={t("Reklam performansı ve maliyet dağılımı", "Ad performance and cost distribution")}
                intro={t(
                    "Türkiye hedefli Performance Max kampanyası tıklamaların %95'inden fazlasını çok düşük maliyetle taşıdı. Almanya–Avusturya hedefli kampanyalar ise tıklamanın küçük bir bölümünü çok daha yüksek maliyetle getirdi; bu da bir sonraki dönemin optimizasyon önceliklerinden biri oldu.",
                    "The Türkiye-targeted Performance Max campaign carried more than 95% of clicks at a very low cost. Germany–Austria-targeted campaigns brought a small share of clicks at a much higher cost, which became one of the next period's optimisation priorities.",
                )}
            >
                <KpiGrid
                    cols={5}
                    items={[
                        { value: n(27003), label: t("Tıklama", "Clicks") },
                        { value: n(900321), label: t("Gösterim", "Impressions") },
                        { value: tl(5.75), label: t("Ort. TBM", "Avg. CPC") },
                        { value: pct(3.0, 2), label: t("Tıklama oranı", "CTR") },
                        { value: tl(155278, 0), label: t("Toplam harcama", "Total spend") },
                    ]}
                />
                <div className="grid gap-6 lg:grid-cols-2">
                    <Panel title={t("Tıklama payı (kampanya bazında)", "Click share (by campaign)")}>
                        <BarList
                            max={100}
                            rows={campaigns.map((c, i) => ({
                                label: c.name,
                                value: (c.clicks / totalClicks) * 100,
                                valueLabel: `${pct((c.clicks / totalClicks) * 100)} · ${n(c.clicks)}`,
                                color: campColors[i],
                            }))}
                        />
                    </Panel>
                    <Panel
                        title={t("Yaklaşık harcama payı", "Approximate spend share")}
                        note={t(
                            "Tahmini: kampanyanın ortalama TBM'si × tıklama sayısı. Raporlanan toplam harcama ile küçük yuvarlama farkı olabilir.",
                            "Estimate: each campaign's average CPC × its clicks. May differ slightly from reported total spend due to rounding.",
                        )}
                    >
                        <BarList
                            max={100}
                            rows={campaigns.map((c, i) => ({
                                label: c.name,
                                value: (spendEst[i] / spendTotal) * 100,
                                valueLabel: pct((spendEst[i] / spendTotal) * 100),
                                color: campColors[i],
                            }))}
                        />
                    </Panel>
                </div>
                <Panel title={t("Kampanya bazında ortalama tıklama başı maliyet (TL)", "Average cost per click by campaign (TRY)")}>
                    <BarList
                        rows={campaigns.map((c, i) => ({
                            label: c.name,
                            value: c.cpc,
                            valueLabel: tl(c.cpc),
                            color: campColors[i],
                        }))}
                    />
                </Panel>
                <Callout>
                    {t(
                        "Almanya–Avusturya kampanyaları tıklamaların yaklaşık %4,4'ünü, tahmini harcamanın ise yaklaşık üçte birini oluşturdu. Bu bulgu, hedefleme daraltma ve teklif stratejisini gözden geçirme çalışmasının gerekçesidir.",
                        "The Germany–Austria campaigns made up about 4.4% of clicks but roughly a third of estimated spend. This finding is the rationale for narrowing targeting and revisiting the bidding strategy.",
                    )}
                </Callout>
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
                <div className="grid gap-6 lg:grid-cols-2">
                    <Panel
                        title={t("İletişim formu hunisi", "Contact form funnel")}
                        note={t("Form başlatma → tamamlama oranı yaklaşık %20,4.", "Form start → completion rate is about 20.4%.")}
                    >
                        <Funnel
                            steps={[
                                { label: t("Form başlatıldı", "Forms started"), value: 1263, valueLabel: n(1263) },
                                { label: t("Form tamamlandı", "Forms completed"), value: 258, valueLabel: n(258) },
                                { label: t("Talep gönderen farklı kullanıcı", "Distinct users who sent an enquiry"), value: 144, valueLabel: n(144) },
                            ]}
                        />
                    </Panel>
                    <Panel
                        title={t("Açılış sayfasına göre hemen çıkma oranı", "Bounce rate by landing page")}
                        note={t("Kaynak: GA4. Parantez içinde sayfanın oturum payı.", "Source: GA4. Session share of each page in brackets.")}
                    >
                        <BarList
                            max={100}
                            rows={[
                                { label: `/tr/Iletisim (${pct(66, 0)})`, value: 71.3, valueLabel: pct(71.3), color: COLORS.bad },
                                { label: `/tr/Urunler/pvc-bazli-kablo… (${pct(1, 0)})`, value: 70.2, valueLabel: pct(70.2), color: COLORS.bad },
                                { label: `/en (${pct(15, 0)})`, value: 39.2, valueLabel: pct(39.2), color: COLORS.warn },
                                { label: `/tr/ (${pct(1, 0)})`, value: 23.8, valueLabel: pct(23.8), color: COLORS.good },
                            ]}
                        />
                    </Panel>
                </div>
                <Callout tone="warn">
                    {t(
                        "Oturumların %66'sı (17.571) doğrudan iletişim sayfasına iniyordu ve bu sayfanın hemen çıkma oranı %71,3 idi. Geniş hedeflemeli kampanyalardan gelen soğuk trafiği form sayfası yerine daha açıklayıcı bir açılış sayfasına yönlendirmek, sonraki dönemin dönüşüm iyileştirme başlıklarından biri.",
                        "66% of sessions (17,571) landed directly on the contact page, which had a 71.3% bounce rate. Sending cold traffic from broad-targeted campaigns to a more explanatory landing page instead of a form page is one of the next period's conversion improvement items.",
                    )}
                </Callout>
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
                title={t("Hedef kelimelerde sıralama hareketi", "Ranking movement on target keywords")}
                intro={t(
                    "Semrush Position Tracking, 7 kelimelik bir hedef set için masaüstü, Türkiye (Google) sonuçlarını 29 Nisan – 12 Ağustos 2026 arasında izledi. Set küçük olduğu için sonuçlar sitenin tamamı değil, seçilen kelimelerin hareketini gösterir.",
                    "Semrush Position Tracking monitored a 7-keyword target set on desktop, Türkiye (Google) from 29 April to 12 August 2026. Because the set is small, results show the movement of the chosen keywords, not the whole site.",
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
                        { value: dec(17.14, 2), label: t("Ort. pozisyon", "Avg. position"), sub: t("13,72 sıra iyileşme", "13.72 positions better") },
                        { value: "4", label: t("İlk 3'teki kelime", "Keywords in top 3"), sub: t("2 yeni, 1 kaybedilen", "2 new, 1 lost") },
                        { value: pct(40.31, 2), label: t("Görünürlük", "Visibility"), sub: t("Önceki döneme göre −%6,31", "−6.31% vs previous period") },
                        { value: dec(3.84, 2), label: t("Tahmini trafik", "Estimated traffic"), sub: t("+1,95", "+1.95") },
                    ]}
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    <Panel title={t("Anahtar kelime pozisyonları", "Keyword positions")}>
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
                                        ["hffr", 1, 1],
                                        ["lszh kablo", 5, 2],
                                        ["hffr kablo nedir", 1, 3],
                                        ["halogen free nedir", 8, 6],
                                    ].map(([k, b, a]) => {
                                        const d = (b as number) - (a as number);
                                        const c = d > 0 ? COLORS.good : d < 0 ? COLORS.bad : COLORS.muted;
                                        return (
                                            <tr key={k as string}>
                                                <td className="py-2.5 pr-3 font-medium text-gray-900">{k}</td>
                                                <td className="py-2.5 pr-3 text-gray-500">{b}</td>
                                                <td className="py-2.5 pr-3 font-bold text-gray-900">{a}</td>
                                                <td className="py-2.5 font-semibold" style={{ color: c }}>
                                                    {d > 0 ? `▲ ${d}` : d < 0 ? `▼ ${Math.abs(d)}` : "—"}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Panel>
                    <Panel
                        title={t("Görünürlüğe etkisi (%)", "Visibility impact (%)")}
                        note={t(
                            "Toplam pozitif etki +17,04, negatif etki −23,35: dönem net olarak hafif eksi kapandı. Geri gerileyen kelimeler bir sonraki dönemin içerik gözden geçirme listesinde.",
                            "Total positive impact +17.04, negative impact −23.35: the period closed slightly negative overall. The declining keywords are on the next period's content review list.",
                        )}
                    >
                        <DivergingBars
                            rows={[
                                ["pvc taban nedir", 14.29],
                                ["lszh kablo", 2.51],
                                ["halogen free nedir", 0.24],
                                ["hffr kablo nedir", -10.56],
                                ["halogen free kablo nedir", -12.79],
                            ].map(([label, v]) => ({
                                label: label as string,
                                value: v as number,
                                valueLabel: `${(v as number) >= 0 ? "+" : "−"}${pct(Math.abs(v as number), 2)}`,
                            }))}
                        />
                    </Panel>
                </div>

                <KpiGrid
                    cols={3}
                    items={[
                        { value: "3 / 7", label: t("AI Overview'da kaynak", "Cited in AI Overview"), sub: t("Takip edilen kelimelerin 3'ünde site doğrudan kaynak gösteriliyor", "The site is cited directly for 3 of the tracked keywords") },
                        { value: "7 / 7", label: t("“People also ask” tetikleyen", "Triggering “People also ask”"), sub: t("Soru-cevap içerik için fırsat", "An opportunity for Q&A content") },
                        { value: "40", label: t("TR blog yazısı", "TR blog posts"), sub: t("Envanteri çıkarıldı; gözden geçirme listesi hazırlandı", "Inventoried; a review list was prepared") },
                    ]}
                />
            </ReportSection>

            {/* 8. TECHNICAL */}
            <ReportSection
                id="teknik"
                eyebrow={t("Teknik sağlık · PageSpeed", "Technical health · PageSpeed")}
                title={t("Site hızı ve teknik skorlar", "Site speed and technical scores")}
                intro={t(
                    "Erişilebilirlik, en iyi uygulamalar ve SEO skorları her iki cihazda da güçlü. Performans, özellikle mobilde, bir sonraki dönemin en yüksek etkili teknik önceliği olarak belirlendi.",
                    "Accessibility, best-practice and SEO scores are strong on both devices. Performance, especially on mobile, was set as the next period's highest-impact technical priority.",
                )}
            >
                <Panel
                    title={t("Google PageSpeed Insights skorları (0–100)", "Google PageSpeed Insights scores (0–100)")}
                    note={t("Test tarihi: 14 Ağustos 2026. Mobil test yavaş 4G simülasyonuyla yapılır; rakamlar bir miktar kötümserdir.", "Test date: 14 August 2026. The mobile test uses a slow-4G simulation, so figures are somewhat pessimistic.")}
                >
                    <ScoreBars
                        mobileName={t("Mobil", "Mobile")}
                        desktopName={t("Masaüstü", "Desktop")}
                        rows={[
                            { label: t("Performans", "Performance"), mobile: 55, desktop: 69 },
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
                title={t("Önümüzdeki dönemin öncelikleri", "Priorities for the next period")}
            >
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            h: t("Site hızı", "Site speed"),
                            items: [
                                t("Render-blocking CSS/JS kaynaklarını ertelemek", "Defer render-blocking CSS/JS"),
                                t("Görselleri WebP/AVIF'e taşımak ve lazy loading uygulamak", "Move images to WebP/AVIF and apply lazy loading"),
                                t("Statik varlıklarda önbellek süresini uzatmak", "Lengthen cache lifetimes on static assets"),
                            ],
                        },
                        {
                            h: "Google Ads",
                            items: [
                                t("Marka arama kampanyasını aktive etmek", "Activate the brand search campaign"),
                                t("Almanya–Avusturya aramasında hedefleme ve teklifi daraltmak", "Narrow targeting and bids on Germany–Austria search"),
                                t("İletişim sayfasına inen soğuk trafiği açıklayıcı bir sayfaya taşımak", "Move cold traffic off the contact page to an explanatory page"),
                            ],
                        },
                        {
                            h: "SEO & " + t("içerik", "content"),
                            items: [
                                t("Gerileyen HFFR yazıları arasında iç linkleme ve konu netleştirme", "Internal linking and topic clarification across declining HFFR posts"),
                                t("Yüksek gösterimli terimlerde başlık/açıklama optimizasyonu", "Title/description optimisation on high-impression terms"),
                                t("AI Overview ve PAA için soru-cevap içerik yapısını genişletmek", "Expand Q&A content structure for AI Overview and PAA"),
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

                <Callout tone="warn">
                    <strong>{t("Dürüst bir not: ", "An honest note: ")}</strong>
                    {t(
                        "Önceki döneme göre yüzdesel artışlar (örneğin kullanıcıda +%2.997) başlangıç neredeyse sıfır olduğu için çarpıcı görünür; asıl anlamlı olan, markanın bir yıl içinde gerçek ve ölçülebilir bir dijital görünürlük kazanmasıdır. Aynı dönemde etkileşim süresi ve sayfa/kullanıcı gibi derinlik metrikleri geriledi; bunlar mobil hız ve açılış sayfası çalışmalarıyla ele alınacak alanlar.",
                        "Percentage increases against the previous period (for example +2,997% in users) look dramatic because the starting point was close to zero; what matters is that the brand gained real, measurable digital visibility in a year. In the same period depth metrics such as engagement time and pages per user declined; these are areas to be addressed through mobile speed and landing page work.",
                    )}
                </Callout>

                <p className="text-xs leading-relaxed text-gray-500">
                    {t(
                        "Kaynaklar: Google Analytics 4 (1 Temmuz 2025 – 27 Temmuz 2026), Google Ads (20 Temmuz 2025 – 27 Temmuz 2026), Google Search Console (20 Temmuz 2025 – 27 Temmuz 2026), Semrush Position Tracking (29 Nisan – 12 Ağustos 2026, masaüstü, Türkiye), Google PageSpeed Insights (14 Ağustos 2026) ve Haziran–Temmuz 2025 başlangıç ölçümü. Rapor tarihi: 14 Ağustos 2026.",
                        "Sources: Google Analytics 4 (1 July 2025 – 27 July 2026), Google Ads (20 July 2025 – 27 July 2026), Google Search Console (20 July 2025 – 27 July 2026), Semrush Position Tracking (29 April – 12 August 2026, desktop, Türkiye), Google PageSpeed Insights (14 August 2026) and the June–July 2025 baseline snapshot. Report date: 14 August 2026.",
                    )}
                </p>
            </ReportSection>
        </div>
    );
}
