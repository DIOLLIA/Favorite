'use client';

import Image from "next/image";
import {useLocale} from "@/app/ui/global/useLocale";

interface FooterProps {
    style?: React.CSSProperties;
}

export default function Footer({style}: FooterProps) {
    const {currentLocale, setLocale} = useLocale();
    const isRussian = currentLocale === 'ru';

    const toggleLanguage = () => {
        setLocale(isRussian ? 'en' : 'ru');
    };

    return (
        <div>
            <footer className="footer" style={style}>
                <div
                    onClick={toggleLanguage}
                    className="cursor-pointer relative w-20 h-8 rounded-full  border border-white flex items-center justify-between px-2 text-white text-sm font-semibold select-none transition"
                >
                    <span className={`transition-opacity duration-300 ${isRussian ? 'opacity-100' : 'opacity-0'}`}>RU</span>
                    <span className={`transition-opacity duration-300 ${!isRussian ? 'opacity-100' : 'opacity-0'}`}>EN</span>
                    <div
                        className={`absolute top-[2px] left-[2px] w-7 h-7 bg-white rounded-full transition-transform duration-300 ${
                            isRussian ? 'translate-x-[46px]' : 'translate-x-0'
                        }`}
                    />
                </div>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn NextJS
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
                    href="https://github.com/DIOLLIA"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/gitHub.svg"
                        alt="Globe icon"
                        width={24}
                        height={24}
                    />
                    My GitHub profile
                </a>
            </footer>
        </div>
    )
}