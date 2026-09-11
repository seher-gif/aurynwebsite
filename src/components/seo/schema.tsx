import { ORG, SITE_URL } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/json-ld";

export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": ORG.name,
        "url": SITE_URL,
        "logo": ORG.logo,
        "description": "Veri odaklı dijital pazarlama ve SEO ajansı. SEO, Google Ads, sosyal medya yönetimi ve dijital pazarlama hizmetleri.",
        "sameAs": ORG.sameAs,
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": ORG.email,
            "telephone": ORG.phone,
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": ORG.address.streetAddress,
            "addressLocality": ORG.address.addressLocality,
            "postalCode": ORG.address.postalCode,
            "addressCountry": ORG.address.addressCountry,
        },
    };

    return <JsonLd data={schema} />;
}

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": SITE_URL,
        "name": ORG.name,
        "image": ORG.logo,
        "description": "SEO, Google Ads ve dijital pazarlama hizmetleri sunan profesyonel ajans.",
        "url": SITE_URL,
        "telephone": ORG.phone,
        "email": ORG.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": ORG.address.streetAddress,
            "addressLocality": ORG.address.addressLocality,
            "postalCode": ORG.address.postalCode,
            "addressCountry": ORG.address.addressCountry,
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    return <JsonLd data={schema} />;
}

export function ServiceSchema({ service }: { service: { name: string; description: string; url: string } }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.name,
        "provider": {
            "@type": "Organization",
            "name": "Auryn Dijital",
            "url": "https://auryndijital.com"
        },
        "description": service.description,
        "areaServed": {
            "@type": "Country",
            "name": "Turkey"
        },
        "url": service.url
    };

    return <JsonLd data={schema} />;
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return <JsonLd data={schema} />;
}
