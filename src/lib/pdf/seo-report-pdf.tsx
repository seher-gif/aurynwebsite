import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { SEOAnalysisResult, SEOMetric } from "@/lib/email/resend";

const COLORS = {
    magenta: "#e51e51",
    purple: "#9089fc",
    dark: "#161616",
    gray: "#555555",
    lightGray: "#888888",
    success: "#1f9d55",
    warning: "#b7791f",
    error: "#c0392b",
    successBg: "#f0fff4",
    warningBg: "#fffbf0",
    errorBg: "#fff5f5",
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
        color: COLORS.dark,
    },
    header: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: `2 solid ${COLORS.magenta}`,
    },
    brand: {
        fontSize: 20,
        fontWeight: 700,
        color: COLORS.magenta,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 11,
        color: COLORS.gray,
    },
    scoreSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        padding: 20,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
    },
    scoreBadge: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.magenta,
        alignItems: "center",
        justifyContent: "center",
    },
    scoreNumber: {
        fontSize: 30,
        fontWeight: 700,
        color: "#ffffff",
    },
    scoreOutOf: {
        fontSize: 9,
        color: "#ffffff",
    },
    domainBlock: {
        flex: 1,
        marginLeft: 20,
    },
    domainLabel: {
        fontSize: 9,
        color: COLORS.lightGray,
        marginBottom: 2,
        textTransform: "uppercase",
    },
    domainValue: {
        fontSize: 14,
        fontWeight: 700,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 12,
        color: COLORS.dark,
        borderBottom: `1 solid #e5e5e5`,
        paddingBottom: 6,
    },
    metricCard: {
        marginBottom: 10,
        padding: 12,
        borderRadius: 6,
        borderLeft: "3 solid",
    },
    metricLabel: {
        fontSize: 11,
        fontWeight: 700,
        marginBottom: 4,
    },
    metricMessage: {
        fontSize: 10,
        color: COLORS.gray,
        lineHeight: 1.4,
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        paddingTop: 12,
        borderTop: "1 solid #e5e5e5",
        fontSize: 8,
        color: COLORS.lightGray,
        textAlign: "center",
    },
    recCard: {
        flexDirection: "row",
        marginBottom: 10,
        padding: 12,
        borderRadius: 6,
        backgroundColor: "#f8f8f8",
    },
    recBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        marginTop: 1,
    },
    recBadgeText: {
        fontSize: 10,
        fontWeight: 700,
        color: "#ffffff",
    },
    recBody: {
        flex: 1,
    },
    recLabel: {
        fontSize: 10,
        fontWeight: 700,
        marginBottom: 3,
    },
    recText: {
        fontSize: 10,
        color: COLORS.gray,
        lineHeight: 1.4,
    },
    noRecText: {
        fontSize: 10,
        color: COLORS.gray,
        marginBottom: 20,
    },
});

function statusColor(status: SEOMetric["status"]) {
    if (status === "success") return { border: COLORS.success, bg: COLORS.successBg, text: COLORS.success };
    if (status === "warning") return { border: COLORS.warning, bg: COLORS.warningBg, text: COLORS.warning };
    return { border: COLORS.error, bg: COLORS.errorBg, text: COLORS.error };
}

function statusLabel(status: SEOMetric["status"]) {
    if (status === "success") return "Uygun";
    if (status === "warning") return "Dikkat";
    return "Kritik";
}

interface SeoReportPdfProps {
    domain: string;
    analysis: SEOAnalysisResult;
    generatedAt?: Date;
}

function SeoReportDocument({ domain, analysis, generatedAt = new Date() }: SeoReportPdfProps) {
    return (
        <Document title={`${domain} - SEO Analiz Raporu`}>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.brand}>Auryn Dijital</Text>
                    <Text style={styles.subtitle}>Profesyonel SEO Analiz Raporu</Text>
                </View>

                <View style={styles.scoreSection}>
                    <View style={styles.scoreBadge}>
                        <Text style={styles.scoreNumber}>{analysis.score}</Text>
                        <Text style={styles.scoreOutOf}>/ 100</Text>
                    </View>
                    <View style={styles.domainBlock}>
                        <Text style={styles.domainLabel}>Analiz Edilen Site</Text>
                        <Text style={styles.domainValue}>{domain}</Text>
                        <Text style={{ fontSize: 9, color: COLORS.lightGray, marginTop: 4 }}>
                            {generatedAt.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Öncelikli Öneriler</Text>
                {(() => {
                    const recommendations = analysis.metrics
                        .filter((m) => m.recommendation)
                        .sort((a, b) => (a.status === "error" ? -1 : 1) - (b.status === "error" ? -1 : 1));

                    if (recommendations.length === 0) {
                        return (
                            <Text style={styles.noRecText}>
                                Tebrikler, ölçülen kriterlerde acil bir aksiyon gerektiren bulgu tespit edilmedi.
                            </Text>
                        );
                    }

                    return recommendations.map((metric, index) => {
                        const c = statusColor(metric.status);
                        return (
                            <View key={index} style={styles.recCard} wrap={false}>
                                <View style={[styles.recBadge, { backgroundColor: c.border }]}>
                                    <Text style={styles.recBadgeText}>{index + 1}</Text>
                                </View>
                                <View style={styles.recBody}>
                                    <Text style={[styles.recLabel, { color: c.text }]}>{metric.label}</Text>
                                    <Text style={styles.recText}>{metric.recommendation}</Text>
                                </View>
                            </View>
                        );
                    });
                })()}

                <Text style={styles.sectionTitle}>Detaylı Bulgular</Text>
                {analysis.metrics.map((metric, index) => {
                    const c = statusColor(metric.status);
                    return (
                        <View key={index} style={[styles.metricCard, { borderLeftColor: c.border, backgroundColor: c.bg }]} wrap={false}>
                            <Text style={[styles.metricLabel, { color: c.text }]}>
                                {metric.label} — {statusLabel(metric.status)}
                            </Text>
                            <Text style={styles.metricMessage}>{metric.message}</Text>
                        </View>
                    );
                })}

                <View style={styles.footer} fixed>
                    <Text>Auryn Dijital — Veri Odaklı Dijital Pazarlama & SEO</Text>
                    <Text>Üçgen, Abdi İpekçi Cd. no:13 kat:1, 07040 Muratpaşa/Antalya — auryndijital.com</Text>
                </View>
            </Page>
        </Document>
    );
}

export async function generateSeoReportPdf(props: SeoReportPdfProps): Promise<Buffer> {
    return renderToBuffer(<SeoReportDocument {...props} />);
}
