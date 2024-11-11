import Image from "next/image";
import {Metadata} from "next";
import Link from "next/link";
import footer from "@/app/ui/global/footer";
import FloatingCircle from "@/app/ui/main/mems";

export const metadata: Metadata = {
    title: 'DIOLLIA',
};
const footerFit = footer

interface MySectionProps {
    uniqueId: string,
    link: string,
    header: string,
    imgSrc: string,
    alt: string
}

function MySection({uniqueId, link, header, imgSrc, alt}: MySectionProps) {
    return (
        <div className="flex flex-col gap-y-80" id={uniqueId}>
            <Link className="w-full h-full"
                  href={link}
                  passHref>
                <div className="w-full h-full relative neon-border">
                    <p>{header}</p>
                    <Image src={imgSrc}
                           alt={alt}
                           layout="fill"
                           objectFit="cover"/>
                </div>
            </Link>
        </div>
    )
}

const sections = [
    {id: 'Games', link: '/games', header: 'Games', imgSrc: '/gothic.jpg', alt: 'gothic placeholder'},
    {id: 'Movie', link: '/movies', header: 'Movie', imgSrc: '/Lebowski.jpg', alt: 'lebowski placeholder'},
    {id: 'Music', link: '/music', header: 'Music', imgSrc: '/rammstein.jpg', alt: 'rammstein placeholder'},
]

export default function Home() {
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
            <FloatingCircle />
            <div>
                ${footerFit()}
            </div>
        </main>
    );
}
