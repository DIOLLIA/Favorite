import Image from "next/image";


export default function footer() {
    return (
        <div>
            <footer className="footer">
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
                    Learn NextJS
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
                    Go to my gitHub profile →
                </a>
            </footer>
        </div>
    )
}