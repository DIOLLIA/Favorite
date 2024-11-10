import {Metadata} from "next";
import footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Music',
};
const footerFit = footer

export default function Home() {
    return (
        <div><p>You are on Music page</p>
            {footerFit()}</div>
    );
}
