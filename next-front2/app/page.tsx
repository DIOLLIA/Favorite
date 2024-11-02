import Image from "next/image";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'DIOLLIA',
};

export default function Home() {
  return (
      <div >
          <div className="grid grid-cols-3 gap-0 h-screen">
              <main className="flex flex-col gap-y-80 ">
                  <div className="w-full h-full relative neon-border">
                      <Image src="/Lebowski.jpg"
                             alt="lebowski placeholder"
                             layout="fill"
                             objectFit="cover"
                      />
                      <p>Movies</p>
                  </div>
              </main>
              <main className="flex flex-col gap-y-80">
                  <div className="w-full h-full relative neon-border">
                      <p>Music</p>
                      <Image src="/rammstein.jpg"
                             alt="rammstein placeholder"
                             layout="fill"
                             objectFit="cover"
                      />
                  </div>
              </main>
              <main className="flex flex-col gap-y-80">
                  <div className="w-full h-full relative neon-border">
                      <p>Games</p>
                      <Image src="/gothic.jpg"
                             alt="gothic placeholder"
                             layout="fill"
                             objectFit="cover"
                      />
                  </div>
              </main>
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
      </div>
  );
}
