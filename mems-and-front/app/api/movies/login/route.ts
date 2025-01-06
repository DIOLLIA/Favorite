import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const backendUrl = 'http://localhost:8081/movies/login';
    const body = await request.text();

    const backendResponse = await fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
        credentials: 'include',
    });

    if (backendResponse.ok) {
        return NextResponse.json(await backendResponse.json(), {
            headers: {
                'Set-Cookie': backendResponse.headers.get('set-cookie') || '',
            },
        });
    } else {
        return NextResponse.json(
            { error: 'Login failed' },
            { status: backendResponse.status }
        );
    }
}