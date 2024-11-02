import Image from "next/image";
import {Metadata} from "next";
import Link from "next/link";
import {links} from "@/app/ui/main/navigation-links";
import {Property} from "csstype";
import Grid = Property.Grid;

export const metadata: Metadata = {
    title: 'DIOLLIA',
};

class GridElement {
    name: string;
    href: string;
    imageSrc: string

    constructor(name: string, href: string, imageSrc: string) {
        this.name = name;
        this.href = href;
        this.imageSrc = imageSrc
    }
}

const movieGE = new GridElement("Movie", "/movie", "/lebowski.jpg");
const gamesGE = new GridElement("Games", "/games", "/gothic.jpg");
const musicGE = new GridElement("Music", "/music", "/rammstein.jpg");

const sections = [movieGE,musicGE, gamesGE]

function buildGridElement(section: GridElement){
return (
    <div key={section.name} className="flex flex-col gap-y-80">
        <Link className="w-full h-full" href={section.href} passHref>
            <div className="w-full h-full relative neon-border">
                <Image
                    src={section.imageSrc}
                    alt={`${section.name} placeholder`}
                    fill
                    className="object-cover"
                />
                <p>{section.name}</p>
            </div>
        </Link>
    </div>
)
}

export default function Home() {
    return (
        <main>
            <div className="grid grid-cols-3 gap-0 h-screen">
                {sections.map(section => buildGridElement(section))}
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
