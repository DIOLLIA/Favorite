import {NextResponse} from 'next/server';

type LangDescription = {
    en: string;
    ru: string;
}

// interface BandDescription {
//     name: string;
//     description: LangDescription
// }

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const lang = searchParams.get('lang');
    const page = searchParams.get('page');

    const response = await fetch(`http://localhost:8083/bands?lang=${lang}&page=${page}`, {
        method: 'GET',
    });

    if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch bands'}, {status: 500});
    }
    // console.dir({obj:await response.text()}) //todo to see object more representative use dir
    const {bands, hasMore} = await response.json();
    return NextResponse.json({bands, hasMore});
}

export async function PATCH(request: Request){
    const {searchParams} = new URL(request.url);
    const lang = searchParams.get('lang');
    const bandName = searchParams.get('bandName');

    if (!bandName || !lang) {
        return NextResponse.json({ error: 'Missing bandName or lang' }, { status: 400 });
    }

    const { newDescription } = await request.json();

    // const bandDescription: BandDescription =  {name: bandName, description: createDescription(lang, newDescription)}

    const response = await fetch(`http://localhost:8083/bands/description/update?lang=${lang}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: bandName, description: createDescription(lang, newDescription) }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to update band description' }, { status: 500 });
    }

    const result = await response.text();
    return NextResponse.json({ success: true, result });
}

function createDescription(lang: string, text: string): LangDescription {
    return lang === 'ru'
        ? { ru: text, en: "" }
        : { en: text, ru: "" };
}