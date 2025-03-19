'use client'

import {useLocale} from "@/app/ui/global/useLocale";
import {useEffect, useState} from "react";

const MUSIC_API_PATH = '/api/music'

interface Band {
    bandName: string,
    description: string
    imagePath: string
}

export default function BandsBar() {
    const lang = useLocale().currentLocale;
    const [bands, setBands] = useState<Band[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${MUSIC_API_PATH}?${lang}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bands');
                }
                const {bands} = await response.json() as { bands: Band[] };
                setBands(bands)
            } catch (error) {
                setError((error as Error).message);
                return <div>Error loading bands. Please try again later.</div>;
            }
        }
        fetchData()
    }, [lang]); // Запуск useEffect при изменении `lang`);

    if (error) {
        return <div>Error loading bands: {error}</div>;
    }

    return (
        <div className="bands-bar">
            {bands.map((band, index) => (
                <div key={index}>
                    <h3>{band.bandName}</h3>
                    <p>{band.description}</p>
                    <img src={band.imagePath} alt={band.bandName}/>
                </div>
            ))}
        </div>
    );
}

/*

export default function BandsBar() {
    const lang = useLocale().currentLocale;
    const [error, setError] = useState<string | null>(null)
    const [bands, setBands] = useState<Band[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${MUSIC_API_PATH}&${lang}`, {method: 'GET_BANDS'})
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseJson = await response.json()
            const bandsJson: Band[] = responseJson()
            setBands(bandsJson)
        } catch (error) {
            setError((error as Error).message)
        }
    } fetchData()

    return <div className="bands-bar">
        bands.map { band => <tr>
        <td> band.name</td>
        <td> band.description</td>
        <td> band.imagePath</td>
    </tr>}
    </div>
}
*/
