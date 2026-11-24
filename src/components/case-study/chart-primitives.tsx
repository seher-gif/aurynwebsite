import type { ReactNode } from "react";

/**
 * Small, dependency-free chart primitives for case-study reports.
 * Everything renders on the server as plain HTML/CSS so charts are fast,
 * print well and keep the numbers readable as text (no canvas, no JS).
 */

export const COLORS = {
    brand: "#e51e51",
    brandSoft: "#f7b6c6",
    purple: "#9089fc",
    ink: "#111827",
    muted: "#6b7280",
    track: "#f3f4f6",
    good: "#059669",
    warn: "#d97706",
    bad: "#dc2626",
};

export function ReportSection({
    id,
    eyebrow,
    title,
    intro,
    children,
}: {
    id: string;
    eyebrow: string;
    title: string;
    intro?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24 py-12 border-t border-gray-200 first:border-t-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-auryn-magenta mb-2">{eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-3">{title}</h2>
            {intro && <div className="text-gray-600 leading-relaxed mb-8 max-w-3xl">{intro}</div>}
            <div className="space-y-8">{children}</div>
        </section>
    );
}

export function Panel({ title, note, children }: { title?: string; note?: ReactNode; children: ReactNode }) {
    return (
        <figure className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
            {title && <figcaption className="text-sm font-semibold text-gray-900 mb-4">{title}</figcaption>}
            {children}
            {note && <div className="mt-4 text-xs leading-relaxed text-gray-500">{note}</div>}
        </figure>
    );
}

export interface Kpi {
    value: string;
    label: string;
    sub?: string;
}

export function KpiGrid({ items, cols = 4 }: { items: Kpi[]; cols?: 3 | 4 | 5 }) {
    const grid = cols === 5 ? "lg:grid-cols-5" : cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
    return (
        <div className={`grid grid-cols-2 ${grid} gap-3 md:gap-4`}>
            {items.map((k) => (
                <div key={k.label} className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold tracking-tight text-auryn-magenta">{k.value}</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">{k.label}</div>
                    {k.sub && <div className="mt-0.5 text-xs text-gray-500">{k.sub}</div>}
                </div>
            ))}
        </div>
    );
}

export interface BarRow {
    label: string;
    value: number;
    valueLabel: string;
    sub?: string;
    color?: string;
}

/** Horizontal bars scaled against the largest value (or a supplied max). */
export function BarList({ rows, max }: { rows: BarRow[]; max?: number }) {
    const top = max ?? Math.max(...rows.map((r) => r.value), 1);
    return (
        <ul className="space-y-3">
            {rows.map((r) => {
                const pct = Math.max((r.value / top) * 100, r.value > 0 ? 1.5 : 0);
                return (
                    <li key={r.label}>
                        <div className="flex items-baseline justify-between gap-3 text-sm">
                            <span className="font-medium text-gray-900 truncate">{r.label}</span>
                            <span className="tabular-nums text-gray-900 font-semibold whitespace-nowrap">{r.valueLabel}</span>
                        </div>
                        <div className="mt-1 h-2.5 rounded-full" style={{ background: COLORS.track }}>
                            <div
                                className="h-2.5 rounded-full"
                                style={{ width: `${pct}%`, background: r.color ?? COLORS.brand }}
                            />
                        </div>
                        {r.sub && <div className="mt-0.5 text-xs text-gray-500">{r.sub}</div>}
                    </li>
                );
            })}
        </ul>
    );
}

export interface Segment {
    label: string;
    pct: number;
    valueLabel: string;
    color: string;
}

/** One stacked 100% bar plus a legend. */
export function StackedShare({ segments }: { segments: Segment[] }) {
    return (
        <div>
            <div className="flex h-5 w-full overflow-hidden rounded-full" style={{ background: COLORS.track }} role="img"
                aria-label={segments.map((s) => `${s.label} ${s.valueLabel}`).join(", ")}>
                {segments.map((s) => (
                    <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} title={`${s.label}: ${s.valueLabel}`} />
                ))}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {segments.map((s) => (
                    <li key={s.label} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 min-w-0">
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                            <span className="truncate text-gray-700">{s.label}</span>
                        </span>
                        <span className="tabular-nums font-semibold text-gray-900 whitespace-nowrap">{s.valueLabel}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export interface CompareRow {
    label: string;
    beforeLabel: string;
    afterLabel: string;
    before: number;
    after: number;
    delta: string;
    /** true when a lower number is the better outcome (e.g. cost per click). */
    lowerIsBetter?: boolean;
}

/** Before/after paired bars for rates that share a unit and period-independent meaning. */
export function CompareBars({ rows, beforeName, afterName }: { rows: CompareRow[]; beforeName: string; afterName: string }) {
    return (
        <div className="space-y-6">
            <div className="flex gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gray-300" />{beforeName}</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS.brand }} />{afterName}</span>
            </div>
            {rows.map((r) => {
                const top = Math.max(r.before, r.after, 1e-9);
                const improved = r.lowerIsBetter ? r.after < r.before : r.after > r.before;
                return (
                    <div key={r.label}>
                        <div className="flex items-baseline justify-between gap-3">
                            <span className="text-sm font-semibold text-gray-900">{r.label}</span>
                            <span className="text-sm font-bold" style={{ color: improved ? COLORS.good : COLORS.bad }}>{r.delta}</span>
                        </div>
                        <div className="mt-2 space-y-1.5">
                            <div className="flex items-center gap-3">
                                <div className="h-3 rounded-full bg-gray-300" style={{ width: `${(r.before / top) * 100}%`, minWidth: 6 }} />
                                <span className="text-xs tabular-nums text-gray-600 whitespace-nowrap">{r.beforeLabel}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-3 rounded-full" style={{ width: `${(r.after / top) * 100}%`, minWidth: 6, background: COLORS.brand }} />
                                <span className="text-xs tabular-nums font-semibold text-gray-900 whitespace-nowrap">{r.afterLabel}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export interface FunnelStep {
    label: string;
    value: number;
    valueLabel: string;
    note?: string;
}

export function Funnel({ steps }: { steps: FunnelStep[] }) {
    const top = steps[0]?.value || 1;
    return (
        <ol className="space-y-3">
            {steps.map((s, i) => (
                <li key={s.label}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-medium text-gray-900">{i + 1}. {s.label}</span>
                        <span className="tabular-nums font-semibold text-gray-900">{s.valueLabel}</span>
                    </div>
                    <div className="mt-1 h-8 rounded-lg" style={{ background: COLORS.track }}>
                        <div
                            className="h-8 rounded-lg"
                            style={{
                                width: `${Math.max((s.value / top) * 100, 4)}%`,
                                background: i === 0 ? COLORS.brandSoft : i === 1 ? COLORS.brand : COLORS.purple,
                            }}
                        />
                    </div>
                    {s.note && <div className="mt-0.5 text-xs text-gray-500">{s.note}</div>}
                </li>
            ))}
        </ol>
    );
}

export interface DivergingRow {
    label: string;
    value: number; // signed
    valueLabel: string;
}

/** Positive values grow right, negative values grow left, from a centre axis. */
export function DivergingBars({ rows }: { rows: DivergingRow[] }) {
    const top = Math.max(...rows.map((r) => Math.abs(r.value)), 1);
    return (
        <ul className="space-y-3">
            {rows.map((r) => {
                const w = (Math.abs(r.value) / top) * 50;
                const pos = r.value >= 0;
                return (
                    <li key={r.label} className="grid grid-cols-[minmax(0,9rem)_1fr_4.5rem] items-center gap-3 text-sm sm:grid-cols-[12rem_1fr_5rem]">
                        <span className="truncate font-medium text-gray-900">{r.label}</span>
                        <div className="relative h-4">
                            <div className="absolute inset-y-0 left-1/2 w-px bg-gray-300" />
                            <div
                                className="absolute inset-y-0 rounded-sm"
                                style={{
                                    background: pos ? COLORS.good : COLORS.bad,
                                    width: `${w}%`,
                                    left: pos ? "50%" : `${50 - w}%`,
                                }}
                            />
                        </div>
                        <span className="text-right tabular-nums font-semibold" style={{ color: pos ? COLORS.good : COLORS.bad }}>
                            {r.valueLabel}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

export interface ScoreRow {
    label: string;
    mobile: number;
    desktop: number;
}

function scoreColor(n: number) {
    return n >= 90 ? COLORS.good : n >= 50 ? COLORS.warn : COLORS.bad;
}

export function ScoreBars({ rows, mobileName, desktopName }: { rows: ScoreRow[]; mobileName: string; desktopName: string }) {
    return (
        <div className="space-y-5">
            {rows.map((r) => (
                <div key={r.label}>
                    <div className="text-sm font-semibold text-gray-900 mb-1.5">{r.label}</div>
                    {([[mobileName, r.mobile], [desktopName, r.desktop]] as const).map(([name, v]) => (
                        <div key={name} className="flex items-center gap-3 mb-1">
                            <span className="w-20 shrink-0 text-xs text-gray-500">{name}</span>
                            <div className="h-3 flex-1 rounded-full" style={{ background: COLORS.track }}>
                                <div className="h-3 rounded-full" style={{ width: `${v}%`, background: scoreColor(v) }} />
                            </div>
                            <span className="w-8 text-right text-sm font-bold tabular-nums" style={{ color: scoreColor(v) }}>{v}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export function Callout({ tone = "brand", children }: { tone?: "brand" | "warn"; children: ReactNode }) {
    const color = tone === "warn" ? COLORS.warn : COLORS.brand;
    return (
        <div className="rounded-xl p-4 md:p-5 text-sm leading-relaxed text-gray-800" style={{ borderLeft: `4px solid ${color}`, background: tone === "warn" ? "#fffbeb" : "#fdf2f5" }}>
            {children}
        </div>
    );
}
