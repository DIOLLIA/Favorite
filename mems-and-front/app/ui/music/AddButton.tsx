'use client';

import {usePathname, useRouter} from 'next/navigation';
import clsx from 'clsx';
import '@/app/css/movies.css';

const BANDS_UPLOAD_API_PATH = '/music/bands/add';

export default function RedirectButton() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (isBackButton) {
            router.push("/music")
        } else {
            router.push(BANDS_UPLOAD_API_PATH);
        }
    };

    const isBackButton = pathname === BANDS_UPLOAD_API_PATH;

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
