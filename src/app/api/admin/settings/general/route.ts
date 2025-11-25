import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch general settings
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch all settings
        const settingsData = await prisma.siteSetting.findMany({
            where: {
                key: {
                    in: ['siteTitle', 'siteDescription', 'siteUrl', 'contactEmail']
                }
            }
        });

        // Convert array to object
        const settings = {
            siteTitle: settingsData.find(s => s.key === 'siteTitle')?.value || 'Auryn Dijital',
            siteDescription: settingsData.find(s => s.key === 'siteDescription')?.value || 'Veri Odaklı Dijital Pazarlama & SEO',
            siteUrl: settingsData.find(s => s.key === 'siteUrl')?.value || 'https://auryndijital.com',
            contactEmail: settingsData.find(s => s.key === 'contactEmail')?.value || 'info@auryndijital.com',
        };

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT - Update general settings
export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { siteTitle, siteDescription, siteUrl, contactEmail } = body;

        // Update or create each setting
        await Promise.all([
            prisma.siteSetting.upsert({
                where: { key: 'siteTitle' },
                update: { value: siteTitle },
                create: { key: 'siteTitle', value: siteTitle }
            }),
            prisma.siteSetting.upsert({
                where: { key: 'siteDescription' },
                update: { value: siteDescription },
                create: { key: 'siteDescription', value: siteDescription }
            }),
            prisma.siteSetting.upsert({
                where: { key: 'siteUrl' },
                update: { value: siteUrl },
                create: { key: 'siteUrl', value: siteUrl }
            }),
            prisma.siteSetting.upsert({
                where: { key: 'contactEmail' },
                update: { value: contactEmail },
                create: { key: 'contactEmail', value: contactEmail }
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
