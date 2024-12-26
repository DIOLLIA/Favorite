import {Metadata} from "next";
import Footer from "@/app/ui/global/footer";
import Header from "@/app/ui/global/header";
import FloatingCircle from "@/app/ui/main/mems";
import GoHome from "@/app/ui/global/goHome";
import MoviesBar from "@/app/movies/Movies";
import RedirectButton from "@/app/ui/movies/RedirectButton";

export const metadata: Metadata = {
    title: 'Movies',
};

export default async function Home() {
    return (
        <div>
            <GoHome/>
            <Header/>
            <RedirectButton/>
            <FloatingCircle/>
            <MoviesBar/>
            <Footer/>
        </div>
    );
}
