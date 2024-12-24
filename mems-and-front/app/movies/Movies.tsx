'use client'

import Image from 'next/image'
import {useEffect, useState} from "react";
import '@/app/css/movies.css'
import Pagination from "@/app/ui/movies/Pagination";
import {usePathname, useSearchParams} from "next/navigation";
import {useLocale} from "@/app/ui/global/useLocale";

interface MovieResponseItem {
    title: string,
    description: string,
    imagePath: string
}

const MOVIE_API_PATH = '/api/movies'
export default function MoviesBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const lang = useLocale().currentLocale;

    const [data, setData] = useState<MovieResponseItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    const limit = Number(searchParams.get('limit')) || 3;
    const offset = Number(searchParams.get('offset')) || 0;

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${MOVIE_API_PATH}?limit=${limit}&offset=${offset}&lang=${lang}`,
                    {method: 'GET'})
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseJson = await response.json()
                const moviesJson: MovieResponseItem[] = responseJson.movieModel;
                const totalCountHeader = response.headers.get('X-Total-Count');

                setTotalCount(Number(totalCountHeader) || 0);
                setData(moviesJson)
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [limit, offset]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleCardClick = (index: number) => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };
    const getCardClass = (index: number)=> {
        if (data.length === 0) {
            return <div>No data found</div>;
        }
        const total = data.length
        const position = (index - currentIndex + total) % total; // Calculate relative position
        if (position === 0) return 'movie-card-0'; // Front
        if (position === 1) return 'movie-card-1'; // Right
        if (position === 2) return 'movie-card-2'; // Left
        return '';
    }

    return (
        <div className="movie-bar">
            <div className="movie-bar-container">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`movie-card ${getCardClass(index)}`}
                        onClick={() => handleCardClick(index)}>
                        <Image
                            className="movie-card-image"
                            src={item.imagePath}
                            alt={`Item ${index}`}
                            width={400}
                            height={300}
                            priority={index === 0}
                        />
                        <p className="movie-card-tit
                        le">{item.title}</p>
                        <p className="movie-card-description">{item.description}</p>
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                <Pagination
                    limit={limit}
                    offset={offset}
                    totalCount={totalCount}
                    pathname={pathname}
                />
            </div>
        </div>
    );
}