import Image from "next/image";
import {Metadata} from "next";
import "@/app/css/uploadImage.css"
import {UploadForm} from "@/lib/uploadData";
import footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Upload Img',
};
const footerFit = footer

export default async function Home() {
    return (
        <>
        <div>
            <h1>Upload an Image</h1>
            <UploadForm />
        </div>
    );
       <div> {footerFit()}</div>
        </>);
}
