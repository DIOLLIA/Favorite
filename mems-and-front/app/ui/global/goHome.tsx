'use client'

import Link from 'next/link'
import {useLocale} from "@/app/ui/global/useLocale";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function GoHome() {
    const { currentLocale } = useLocale();
    const [hrefWithLang, setHrefWithLang] = useState('/?lang=en'); // Значение по умолчанию

    useEffect(() => {
        setHrefWithLang(`/?lang=${currentLocale}`);
    }, [currentLocale]);

    return (
        <Link className="base-circle go-home-circle" href={hrefWithLang} passHref>
            <div>
                <Image
                    width= "100"
                    height="100"
                    src={"/mainPage/go-to-main.jpg"}
                    alt="go-home"
                    className="circle-image"
                />
            </div>
        </Link>
    );
}