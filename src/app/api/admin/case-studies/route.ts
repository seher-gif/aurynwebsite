import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch all case studies
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const caseStudies = await prisma.caseStudy.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(caseStudies);
    } catch (error) {
        console.error('Error fetching case studies:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST - Create new case study
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, client, slug, excerpt, content, coverImage, results, category, published } = body;

        const caseStudy = await prisma.caseStudy.create({
            data: {
                title,
                client,
                slug,
                excerpt,
                content,
                coverImage,
                results,
                category,
                published: published || false,
            },
        });

        return NextResponse.json(caseStudy);
    } catch (error) {
        console.error('Error creating case study:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT - Update case study
export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, title, client, slug, excerpt, content, coverImage, results, category, published } = body;

        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: {
                title,
                client,
                slug,
                excerpt,
                content,
                coverImage,
                results,
                category,
                published,
            },
        });

        return NextResponse.json(caseStudy);
    } catch (error) {
        console.error('Error updating case study:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE - Delete case study
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Case study ID required' }, { status: 400 });
        }

        await prisma.caseStudy.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting case study:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
