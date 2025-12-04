import { prisma } from "@/lib/prisma";

export async function DigitalTools() {
    try {
        const tools = await prisma.marketingTool.findMany();

        // Collect all codes
        const headerCodes: string[] = [];
        const bodyCodes: string[] = [];
        const footerCodes: string[] = [];

        tools.forEach((tool) => {
            const data = tool.data as { headerCode?: string; bodyCode?: string; footerCode?: string };
            if (data?.headerCode) {
                headerCodes.push(data.headerCode);
            }
            if (data?.bodyCode) {
                bodyCodes.push(data.bodyCode);
            }
            if (data?.footerCode) {
                footerCodes.push(data.footerCode);
            }
        });

        return {
            headerCodes,
            bodyCodes,
            footerCodes,
        };
    } catch (error) {
        console.error("Failed to fetch digital tools:", error);
        return {
            headerCodes: [],
            bodyCodes: [],
            footerCodes: [],
        };
    }
}

export async function HeaderScripts() {
    const { headerCodes } = await DigitalTools();

    if (headerCodes.length === 0) return null;

    return (
        <>
            {headerCodes.map((code, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: code }} />
            ))}
        </>
    );
}

export async function BodyScripts() {
    const { bodyCodes } = await DigitalTools();

    if (bodyCodes.length === 0) return null;

    return (
        <>
            {bodyCodes.map((code, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: code }} />
            ))}
        </>
    );
}

export async function FooterScripts() {
    const { footerCodes } = await DigitalTools();

    if (footerCodes.length === 0) return null;

    return (
        <>
            {footerCodes.map((code, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: code }} />
            ))}
        </>
    );
}
