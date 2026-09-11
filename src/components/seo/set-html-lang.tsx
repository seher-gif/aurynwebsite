"use client";

import { useEffect } from "react";

/**
 * The root layout's <html> tag is shared across locales and defaults to
 * lang="tr". This corrects it client-side for routes under /en. Search
 * engines rely primarily on hreflang tags (not this attribute) for locale
 * detection, but this keeps the DOM correct for assistive technology.
 */
export function SetHtmlLang({ lang }: { lang: string }) {
    useEffect(() => {
        const previous = document.documentElement.lang;
        document.documentElement.lang = lang;
        return () => {
            document.documentElement.lang = previous;
        };
    }, [lang]);

    return null;
}
