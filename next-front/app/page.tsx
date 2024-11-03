import Image from "next/image";
import {Metadata} from "next";
import Link from "next/link";
import {links} from "@/app/ui/main/navigation-links";

export const metadata: Metadata = {
    title: 'DIOLLIA',
};

interface MySectionProps {
    key:string,
    link:string,
    header:string,
    imgSrc:string,
    alt:string
}

function MySection({key, link, header, imgSrc, alt}: MySectionProps) {
    return (
        <div className="flex flex-col gap-y-80">
            <Link className="w-full h-full"
                  key={key}
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
    {key: 'Movie', link: '/movies', header: 'Movie', imgSrc: '/Lebowski.jpg', alt: 'lebowski placeholder'},
    {key: 'Music', link: '/music', header: 'Music', imgSrc: '/rammstein.jpg', alt: 'rammstein placeholder'},
    {key: 'Games', link: '/games', header: 'Games', imgSrc: '/gothic.jpg', alt: 'gothic placeholder'},
]

export default function Home() {
    return (
        <main>
            <div className="grid grid-cols-3 gap-0 h-screen">
                {
                    sections.map(({key, link, header, imgSrc, alt}: MySectionProps) =>
                        <MySection
                          key={key}
                          link={link}
                          header={header}
                          imgSrc={imgSrc}
                          alt={alt}
                        />
                    )
                }
            </div>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </main>
    );
}
