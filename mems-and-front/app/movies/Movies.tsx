'use client'

import Image from 'next/image'
import {useEffect, useState} from "react";
import '@/app/css/movies.css'

interface MovieResponseItem {
    title: string,
    description: string,
    imagePath: string
}

const MOVIE_API_PATH = 'http://localhost:8081/movies'
export default function MoviesBar() {
    const [data, setData] = useState<MovieResponseItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(MOVIE_API_PATH, {method: 'GET'})
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const moviesJson: MovieResponseItem[] = await response.json()
                setData(moviesJson)
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (data.length === 0) {
        return <div>No data found</div>;
    }

    return (
        <div className="movie-bar">
            <div className="movie-bar-container">
            {data.map((item, index) => (
                <div key={index}>
                    <p>{item.title}</p>
                    <>{item.description}</>
                    <Image
                        className={`movie-bar-item movie-bar-item-${index}`}
                        src={item.imagePath}
                        alt={`Item ${index}`}
                        width={400}
                        height={300}
                        priority={index === 0}
                    />
                </div>
            ))}
            </div>
        </div>
    );
}