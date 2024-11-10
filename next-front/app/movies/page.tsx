import {Metadata} from "next";
import footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Movies',
};
const footerFit = footer

export default async function Home() {
    return (
        <div><p>You are on Movies page</p>
            {footerFit()}</div>
    );
}
