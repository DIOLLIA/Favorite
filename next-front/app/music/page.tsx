import {Metadata} from "next";
import Footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Music',
};

export default function Home() {
    return (
        <div><p>You are on Music page</p>
            <Footer/>
        </div>
    );
}
