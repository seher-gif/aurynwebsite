import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n/routes";
import { LysPolychemReport } from "./lys-polychem-report";

/**
 * Rich, chart-based reports for specific case studies, keyed by the case
 * study slug in either locale. A case study without an entry here falls
 * back to the plain text content stored in the database.
 */
const REPORTS: Record<string, ComponentType<{ locale: Locale }>> = {
    "lys-polychem-dijital-performans-vaka-calismasi": LysPolychemReport,
    "lys-polychem-digital-performance-case-study": LysPolychemReport,
};

export function hasCaseStudyReport(slug: string): boolean {
    return slug in REPORTS;
}

export function CaseStudyReport({ slug, locale }: { slug: string; locale: Locale }) {
    const Report = REPORTS[slug];
    return Report ? <Report locale={locale} /> : null;
}
