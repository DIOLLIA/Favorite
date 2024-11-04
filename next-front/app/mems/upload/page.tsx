import Image from "next/image";
import {Metadata} from "next";
import "@/app/css/uploadImage.css"

export const metadata: Metadata = {
    title: 'Upload',
};

export default async function Home() {
    return (
        <div>
            <form className="image-form" action="/" method="POST" encType="multipart/form-data">
                <div className="image-form">
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" id="image" name="image" required/>
                </div>
                <div className="image-form input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="imageName" required/>
                </div>
                <div className="image-form input">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" required/>
                </div>
                <button className="image-form-button" type="submit">Submit</button>
            </form>

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
    )
        ;
}
