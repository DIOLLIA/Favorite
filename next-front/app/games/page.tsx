import {Metadata} from "next";
import footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Games',
};
const footerFit = footer

export default function Home() {
    return (
        <div><p>You are on Games page</p>
            {footerFit()}</div>
    );
}
