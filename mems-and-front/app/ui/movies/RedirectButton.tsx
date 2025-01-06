'use client';

import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import '@/app/css/movies.css';

const MOVIE_UPLOAD_API_PATH = '/movies/upload';
const MOVIE_LOGIN_PATH = '/movies/login';

export default function RedirectButton() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname === MOVIE_UPLOAD_API_PATH || pathname === MOVIE_LOGIN_PATH) {
            router.push('/movies'); // Redirect to /movies
        } else {
            router.push(MOVIE_UPLOAD_API_PATH); // Redirect to /movies/upload
        }
    };

    const isBackButton = pathname === MOVIE_UPLOAD_API_PATH || pathname === MOVIE_LOGIN_PATH;

    return (
        <button
            onClick={handleClick}
            className={clsx('redirect-button', {
                'back-button': isBackButton,
            })}>
            {isBackButton ? 'Back' : 'Upload'}
        </button>
    );
}
