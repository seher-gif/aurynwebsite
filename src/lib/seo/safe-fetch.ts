import dns from "node:dns/promises";
import net from "node:net";

const MAX_REDIRECTS = 5;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5MB
const USER_AGENT = "AurynSEOBot/1.0 (+https://auryndijital.com)";

export class UnsafeUrlError extends Error {}

function ipToLong(ip: string): number {
    return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function isPrivateIPv4(ip: string): boolean {
    const long = ipToLong(ip);
    const ranges: [string, number][] = [
        ["0.0.0.0", 8],
        ["10.0.0.0", 8],
        ["100.64.0.0", 10],
        ["127.0.0.0", 8],
        ["169.254.0.0", 16], // includes cloud metadata 169.254.169.254
        ["172.16.0.0", 12],
        ["192.0.0.0", 24],
        ["192.0.2.0", 24],
        ["192.168.0.0", 16],
        ["198.18.0.0", 15],
        ["198.51.100.0", 24],
        ["203.0.113.0", 24],
        ["224.0.0.0", 4],
        ["240.0.0.0", 4],
    ];
    return ranges.some(([base, bits]) => {
        const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
        return (long & mask) === (ipToLong(base) & mask);
    });
}

function isPrivateIPv6(ip: string): boolean {
    const normalized = ip.toLowerCase();
    if (normalized === "::1") return true; // loopback
    if (normalized.startsWith("::ffff:")) {
        // IPv4-mapped IPv6
        const v4 = normalized.split(":").pop()!;
        if (net.isIPv4(v4)) return isPrivateIPv4(v4);
    }
    if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true; // unique local
    if (normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb")) return true; // link-local
    if (normalized === "::") return true;
    return false;
}

export function isPrivateOrReservedIp(ip: string): boolean {
    if (net.isIPv4(ip)) return isPrivateIPv4(ip);
    if (net.isIPv6(ip)) return isPrivateIPv6(ip);
    return true; // unknown format - reject
}

/**
 * Validates that a URL is safe to fetch server-side: http/https only,
 * hostname resolves to a public (non-private/reserved) IP address.
 * Throws UnsafeUrlError otherwise.
 */
export async function assertPublicHttpUrl(rawUrl: string): Promise<URL> {
    let parsed: URL;
    try {
        parsed = new URL(rawUrl);
    } catch {
        throw new UnsafeUrlError("Geçersiz URL formatı.");
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new UnsafeUrlError("Sadece http/https protokollerine izin verilir.");
    }

    const hostname = parsed.hostname.toLowerCase();
    if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "0.0.0.0" || hostname === "[::1]") {
        throw new UnsafeUrlError("Yerel/dahili adreslere erişim engellidir.");
    }

    // If hostname is already a literal IP, validate directly.
    if (net.isIP(hostname)) {
        if (isPrivateOrReservedIp(hostname)) {
            throw new UnsafeUrlError("Dahili/özel IP adreslerine erişim engellidir.");
        }
        return parsed;
    }

    let addresses: string[];
    try {
        const results = await dns.lookup(hostname, { all: true });
        addresses = results.map((r) => r.address);
    } catch {
        throw new UnsafeUrlError("Alan adı çözümlenemedi.");
    }

    if (addresses.length === 0) {
        throw new UnsafeUrlError("Alan adı çözümlenemedi.");
    }

    if (addresses.some((ip) => isPrivateOrReservedIp(ip))) {
        throw new UnsafeUrlError("Bu alan adı dahili bir ağa yönlendiriyor, analiz edilemez.");
    }

    return parsed;
}

/**
 * Fetches an arbitrary user-supplied URL safely: validates against SSRF
 * (protocol, private IPs) on every hop, follows a limited number of
 * redirects manually (re-validating each target), enforces a timeout and
 * a maximum response body size.
 */
export async function safeFetchPublicUrl(
    rawUrl: string,
    init?: { timeoutMs?: number }
): Promise<{ response: Response; finalUrl: string; body: string }> {
    let currentUrl = rawUrl;
    let response: Response | null = null;

    for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount++) {
        const validated = await assertPublicHttpUrl(currentUrl);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), init?.timeoutMs ?? FETCH_TIMEOUT_MS);

        try {
            response = await fetch(validated.toString(), {
                headers: { "User-Agent": USER_AGENT },
                redirect: "manual",
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeout);
        }

        if ([301, 302, 303, 307, 308].includes(response.status)) {
            const location = response.headers.get("location");
            if (!location) {
                throw new UnsafeUrlError("Yönlendirme hedefi bulunamadı.");
            }
            currentUrl = new URL(location, validated).toString();
            continue;
        }

        break;
    }

    if (!response) {
        throw new UnsafeUrlError("Site yanıt vermedi.");
    }

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_BYTES) {
        throw new Error("Sayfa içeriği çok büyük, analiz edilemedi.");
    }

    const reader = response.body?.getReader();
    if (!reader) {
        const body = await response.text();
        return { response, finalUrl: response.url || currentUrl, body };
    }

    const chunks: Uint8Array[] = [];
    let received = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        if (received > MAX_RESPONSE_BYTES) {
            await reader.cancel();
            throw new Error("Sayfa içeriği çok büyük, analiz edilemedi.");
        }
        chunks.push(value);
    }
    const body = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString("utf-8");

    return { response, finalUrl: response.url || currentUrl, body };
}
