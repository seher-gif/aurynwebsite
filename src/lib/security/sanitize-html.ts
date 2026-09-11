import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes admin-authored rich text (blog posts, CMS pages) before
 * rendering with dangerouslySetInnerHTML. Strips scripts, event handlers,
 * and any tag/attribute outside this allowlist - even for content written
 * by a trusted admin account, since that account can be compromised (see
 * incident: unauthenticated /api/seed reset the admin password).
 */
export function sanitizeRichText(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: [
            "p", "br", "hr",
            "h1", "h2", "h3", "h4", "h5", "h6",
            "strong", "b", "em", "i", "u", "s", "mark", "small", "sub", "sup",
            "ul", "ol", "li",
            "blockquote", "q", "cite",
            "a", "img", "figure", "figcaption",
            "table", "thead", "tbody", "tr", "th", "td",
            "code", "pre", "span", "div",
        ],
        allowedAttributes: {
            a: ["href", "title", "target", "rel"],
            img: ["src", "alt", "title", "width", "height", "loading"],
            "*": ["class"],
        },
        allowedSchemes: ["http", "https", "mailto"],
        allowedSchemesByTag: {
            img: ["http", "https"],
        },
        // Force safe rel/target on links to prevent tabnabbing via injected anchors.
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }),
        },
        disallowedTagsMode: "discard",
    });
}
