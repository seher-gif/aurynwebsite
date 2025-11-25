export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Auryn Dijital",
        "alternateName": "Auryn Digital Marketing",
        "url": "https://auryndijital.com",
        "logo": "https://auryndijital.com/logo.png",
        "description": "Veri odaklı dijital pazarlama ve SEO ajansı. SEO, Google Ads, sosyal medya yönetimi ve dijital pazarlama hizmetleri.",
        "sameAs": [
            "https://www.linkedin.com/company/auryn-dijital",
            "https://www.instagram.com/auryndijital",
            "https://twitter.com/auryndijital"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "info@auryndijital.com"
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "TR",
            "addressLocality": "İstanbul"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://auryndijital.com",
        "name": "Auryn Dijital",
        "image": "https://auryndijital.com/logo.png",
        "description": "SEO, Google Ads ve dijital pazarlama hizmetleri sunan profesyonel ajans.",
        "url": "https://auryndijital.com",
        "telephone": "+90-XXX-XXX-XXXX",
        "email": "info@auryndijital.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "TR",
            "addressLocality": "İstanbul"
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
