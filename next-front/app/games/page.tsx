import {Metadata} from "next";
import Footer from "@/app/ui/global/footer";
import Header from "@/app/ui/global/header";
import FloatingCircle from "@/app/ui/main/mems";

export const metadata: Metadata = {
    title: 'Games',
};

export default function Home() {
    return (
        <div>
            <Header/>
            <FloatingCircle/>
            <Footer/>
        </div>
    );
}
