'use client';

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

const DEFAULT_LOCALE = 'en';
const ALLOWED_LOCALES = ['en', 'ru'];

export function useLocale() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentLocale = searchParams.get('lang') || DEFAULT_LOCALE;

    useEffect(() => {
        const lang = searchParams.get('lang');
        if (!lang || !ALLOWED_LOCALES.includes(lang)) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('lang', DEFAULT_LOCALE);
            router.replace(`?${params.toString()}`);
        }
    }, [searchParams, router]);

    const setLocale = (newLocale: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', newLocale);
        router.replace(`?${params.toString()}`);
    };

    return {currentLocale, setLocale};
}