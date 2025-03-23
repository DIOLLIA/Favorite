'use client'

import {useLocale} from "@/app/ui/global/useLocale";
import {useEffect, useRef, useState} from "react";
import '@/app/css/bands.css'

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
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState(true)
    const loader = useRef<HTMLDivElement | null>(null)
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = async (page: number) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${MUSIC_API_PATH}?lang=${lang}&page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bands');
            }
            const {bands} = await response.json() as { bands: Band[] };

            if (bands.length === 0) {
                setHasMore(false)
                return
            }
            setBands(previous => [...previous, ...bands])

        } catch (error) {
            setError((error as Error).message);
            return <div>Error loading bands. Please try again later.</div>;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setBands([]);
        setPage(0);
        setHasMore(true);
    }, [lang]);  // useEffect on `lang` change

    useEffect(() => {
        fetchData(page);
    }, [page, lang]);


    useEffect(() => {
        if (!hasMore || isLoading) {
            return;
        }
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setPage(previousPage => previousPage + 1)
                }
            },
            {threshold: 1}
        );
        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [hasMore, isLoading]);

    if (error) {
        return <div>Error loading bands: {error}</div>;
    }


    return (
        <div className="bands-container">
            <div className="bands-bar">
                {bands.map((band, index) => (
                    <div className="band-card" key={index}>
                        <img src={band.imagePath} alt={band.bandName}/>
                        <h3>{band.bandName}</h3>
                        <p>{band.description}</p>
                    </div>
                ))}
                {hasMore && <div ref={loader} className="loading-trigger"></div>}
            </div>
        </div>
    );
}