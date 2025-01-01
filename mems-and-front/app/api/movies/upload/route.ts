import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            params.append(key, value.toString());
        }

        const backendUrl = 'http://localhost:8081/movies/upload';

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: request.headers.get('cookie') || '',
            },
            body: params.toString(),
            credentials: 'include',
        });

        if (response.status === 401) { //todo fix with SS
            const host = request.nextUrl.origin;
            return NextResponse.redirect(`${host}/movies/login`);
        }

        if (response.ok) {
            return NextResponse.json({ success: true });
        }

        throw new Error(`Backend responded with status: ${response.status}`);
    } catch (error) {
        console.error('Error in /api/movies/upload route:', error);
        return NextResponse.json({ error: 'Unable to process request' }, { status: 500 });
    }
}