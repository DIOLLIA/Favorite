import {Metadata} from "next";
import Footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Games',
};

export default function Home() {
    return (
        <div><p>You are on Games page</p>
            <Footer/>
        </div>
    );
}
