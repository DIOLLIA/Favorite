import {NextResponse, NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const backendUrl = 'http://localhost:8081/movies/upload';
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                Cookie: request.headers.get('cookie') || '',
            },
            redirect: 'manual',
            credentials: 'include', // Включаем передачу сессионных данных//todo need it? check with SS
        });
        console.log('Response URL:', response.url);

        if (response.status === (401)) {
            const host = request.nextUrl.origin
            return NextResponse.redirect(host + '/movies/login');
        }

        if (response.ok) {
            return NextResponse.json({authorized: true});
        }

        throw new Error(`Unexpected response from backend: ${response.status}`);
    } catch (error) {
        console.error('Error in /movies/upload GET route:', error);
        return NextResponse.json({error: 'Unable to process request'}, {status: 500});
    }
}
