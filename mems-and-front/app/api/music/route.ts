import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');

    const response = await fetch(`http://localhost:8083/bands?lang=${lang}`, {
        method: 'GET',
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch bands' }, { status: 500 });
    }

    const bands = await response.json();
    return NextResponse.json({ bands });
}