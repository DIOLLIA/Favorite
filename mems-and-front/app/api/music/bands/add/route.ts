import {NextResponse} from 'next/server';

interface Band {
    name: string,
    imagePath: string
    description: Map<Lang, string>
}

enum Lang {
    EN = 'EN',
    RU = 'RU'
}

export async function POST(request: Request) {
    const uploadUrl = 'http://localhost:8083/bands/create'

    try {
        const body = await request.json();

        const { name, imagePath, description } = body;

        const bandData: Band = {
            name,
            imagePath,
            description
        };

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bandData),
        });

        if (!response.ok) {
            return NextResponse.json({error: 'Failed to fetch bands'}, {status: 500});
        }

        const bands = await response.json();
        return NextResponse.json({bands});

    } catch (error) {
        return NextResponse.json(
            {error: error instanceof Error ? error.message : 'Unknown error'},
            {status: 500}
        );
    }
}