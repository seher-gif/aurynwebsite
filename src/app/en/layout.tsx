import { SetHtmlLang } from "@/components/seo/set-html-lang";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SetHtmlLang lang="en" />
            {children}
        </>
    );
}
