'use client'

import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/ui/global/footer";
import FloatingMemCircle from "@/app/ui/main/mems";
import {useSearchParams} from "next/navigation";

interface MySectionProps {
    uniqueId: string,
    link: string,
    header: string,
    imgSrc: string,
    alt: string
}

function MySection({uniqueId, link, header, imgSrc, alt}: MySectionProps) {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || 'en';

    const hrefWithLang = `${link}${link.includes('?') ? '&' : '?'}lang=${lang}`;

    return (
        <div className="flex flex-col gap-y-80" id={uniqueId}>
            <Link className="w-full h-full"
                  href={hrefWithLang}
                  passHref>
                <div className="w-full h-full relative neon-border">
                    <p>{header}</p>
                    <Image src={imgSrc}
                           alt={alt}
                           fill
                           style={{objectFit: 'cover'}}/>
                </div>
            </Link>
        </div>
    )
}

const sections = [
    {id: 'Games', link: '/games', header: 'Games', imgSrc: '/mainPage/gothic.jpg', alt: 'gothic placeholder'},
    {
        id: 'Movie',
        link: '/movies?limit=3&offset=0',
        header: 'Movie',
        imgSrc: '/mainPage/Lebowski.jpg',
        alt: 'lebowski placeholder'
    },
    {id: 'Music', link: '/music', header: 'Music', imgSrc: '/mainPage/rammstein.jpg', alt: 'rammstein placeholder'},
]

export default function HomePage() {
    return (
        <main>
            <div className="grid grid-cols-3 gap-0 h-screen">
                {
                    sections.map((section) =>
                        (<MySection
                            key={section.id}
                            uniqueId={section.id}
                            link={section.link}
                            header={section.header}
                            imgSrc={section.imgSrc}
                            alt={section.alt}
                        />)
                    )
                }
            </div>
            <FloatingMemCircle/>
            <Footer style={{backgroundColor: "transparent "}}/>
        </main>
    );
}
