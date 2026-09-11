/**
 * Lightweight in-memory rate limiter. Good enough to blunt casual brute-force
 * and credential-stuffing attempts on a single-instance/low-traffic deployment.
 * Note: state is per server instance - on serverless platforms with multiple
 * concurrent instances this is not a hard guarantee, only a deterrent layer.
 * For stronger guarantees, back this with Redis/Upstash.
 */
interface Entry {
    count: number;
    windowStart: number;
    lockedUntil?: number;
}

const store = new Map<string, Entry>();

export function isRateLimited(key: string, opts: { windowMs: number; max: number }): boolean {
    const entry = store.get(key);
    const now = Date.now();

    if (entry?.lockedUntil && now < entry.lockedUntil) {
        return true;
    }

    if (!entry || now - entry.windowStart > opts.windowMs) {
        return false;
    }

    return entry.count >= opts.max;
}

export function recordAttempt(key: string, opts: { windowMs: number; max: number; lockoutMs: number }): void {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now - entry.windowStart > opts.windowMs) {
        store.set(key, { count: 1, windowStart: now });
        return;
    }

    entry.count += 1;
    if (entry.count >= opts.max) {
        entry.lockedUntil = now + opts.lockoutMs;
    }
}

export function clearAttempts(key: string): void {
    store.delete(key);
}
