import {Metadata} from "next";
import Footer from "@/app/ui/global/footer";
import Header from "@/app/ui/global/header";
import FloatingCircle from "@/app/ui/main/mems";
import GoHome from "@/app/ui/global/goHome";

export const metadata: Metadata = {
    title: 'Music',
};

export default function Home() {
    return (
        <div>
            <GoHome/>
            <Header/>
            <FloatingCircle/>
            <Footer/>
        </div>
    );
}
