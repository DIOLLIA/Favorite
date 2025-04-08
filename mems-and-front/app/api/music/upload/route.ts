import {NextResponse} from 'next/server';

// curl -X POST -H 'Content-Type: application/json' -d '{"bandName":"sepultura",
// "bandDescription":{"EN":"eng sep mong description"}}' http://localhost:8083/bands/descriptions/add

interface BandDescription {
    name: string|null,
    description: Map<Lang, string>
}

enum Lang {
    EN = 'EN',
    RU = 'RU'
}

export async function POST(request: Request) {
    const uploadUrl = 'http://localhost:8083/bands/descriptions/add'

    try {
        const formData = await request.formData()
        const descriptions = new Map<Lang, string>();
        const name = formData.get('bandName') as string
        descriptions.set(Lang.EN, formData.get('bandDescription[EN]') as string)
        descriptions.set(Lang.RU, formData.get('bandDescription[RU]') as string)

        const bandData: BandDescription = {
            name: name,
            description: descriptions
        };

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                name: bandData.name,
                description: Object.fromEntries(bandData.description)
            })
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