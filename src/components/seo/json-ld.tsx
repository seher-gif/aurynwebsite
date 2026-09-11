export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            // JSON.stringify output cannot contain unescaped "</" that would close the
            // surrounding <script> tag early.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}
