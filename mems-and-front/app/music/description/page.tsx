import GoHome from "@/app/ui/global/goHome";
import Header from "@/app/ui/global/header";
import FloatingCircle from "@/app/ui/main/mems";
import Footer from "@/app/ui/global/footer";
import UploadBandDescription from "@/app/music/description/addDescription";

export default function Home() {
    return (
        <div>
            <GoHome/>
            <Header/>
            <FloatingCircle/>
            <UploadBandDescription/>
            <Footer />
        </div>
    );
}
