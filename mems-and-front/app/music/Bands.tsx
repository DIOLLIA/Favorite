'use client'

import {useLocale} from "@/app/ui/global/useLocale";
import {useEffect, useRef, useState} from "react";
import '@/app/css/bands.css'
import BandCard from "@/app/music/bandCard";

const MUSIC_API_PATH = '/api/music'

export interface Band {
    bandName: string,
    description: string
    imagePath: string
}

export default function BandsBar() {
    const lang = useLocale().currentLocale;
    const [localeReady, setLocaleReady] = useState(false);

    const [bands, setBands] = useState<Band[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState(true)
    const loader = useRef<HTMLDivElement | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const initialPage = 0
    const pageIncrement = 4

    const fetchData = async (page: number) => {
        if (!hasMore || isLoading) {
            return;
        }
        try {
            setIsLoading(true)
            const response = await fetch(`${MUSIC_API_PATH}?lang=${lang}&page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bands');
            }

            const {bands: newBands, hasMore} = await response.json() as { bands: Band[], hasMore: boolean };

            setBands(previous => [...previous, ...newBands])
            setHasMore(hasMore)

        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (lang) {
            setLocaleReady(true);
        }
    }, [lang]);

    useEffect(() => {
        if (!localeReady) return;
        setBands([]);
        setPage(initialPage);
        setHasMore(true);
    }, [lang, localeReady]);  // useEffect on `lang` change

    useEffect(() => {
        if (!localeReady) return;
        fetchData(page);
    }, [page, lang, localeReady]);

    useEffect(() => {
            if (!localeReady || !hasMore || isLoading) return;

            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        setPage(previousPage => previousPage + pageIncrement)
                    }
                },
                {threshold: 1, rootMargin: "0px 0px -5px 0px"}
            );
            if (loader.current) observer.observe(loader.current);
            return () => {
                if (loader.current) observer.unobserve(loader.current);
            };
        }, [localeReady, hasMore, isLoading]
    );

    if (error) {
        return <div>Error loading bands: {error}</div>;
    }

    return (
        <div className={`bands-container ${expandedIndex !== null ? 'blurred' : ''}`}>
            <div className="bands-bar">
                {bands.map((band, index) => (
                    <BandCard
                        key={index}
                        band={band}
                        name={band.bandName}
                        isExpanded={expandedIndex === index}
                        onToggleExpand={() => {
                            setExpandedIndex(expandedIndex === index ? null : index);
                        }}
                        onSave={async (bandName, newDescription) => {
                            try {
                                const response = await fetch(`/api/music/?lang=${lang}&bandName=${bandName}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({newDescription}),
                                });

                                if (!response.ok) {
                                    throw new Error(`Failed to update: ${response.statusText}`);
                                } else {
                                    setBands(prev =>
                                        prev.map((b) =>
                                            b.bandName === bandName ? {...b, description: newDescription} : b
                                        )
                                    );
                                }
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    />
                ))}
                {hasMore && <div ref={loader} className="loading-trigger"></div>}
            </div>
        </div>
    );
}