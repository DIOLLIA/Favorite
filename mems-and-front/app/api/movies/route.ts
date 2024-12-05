import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '3';
    const offset = searchParams.get('offset') || '0';

    const response = await fetch(`http://localhost:8081/movies?limit=${limit}&offset=${offset}`, {
        method: 'GET',
    });

    const headers = new Headers(response.headers);
    // headers.set('Access-Control-Allow-Origin', '*');

    const json = await response.json();

    return NextResponse.json(json, { headers });
}