import {Metadata} from "next";
import Footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Movies',
};

export default async function Home() {
    return (
        <div><p>You are on Movies page</p>
            <Footer/>
        </div>
    );
}
