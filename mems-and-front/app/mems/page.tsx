import {Metadata} from "next";
import {getAllMems} from "@/lib/data";
import {Card} from "@/app/mems/memCard";
import Footer from "@/app/ui/global/footer";
import GoHome from "@/app/ui/global/goHome";
import FooterLogout from "@/app/ui/global/footer-logout";

export const metadata: Metadata = {
    title: 'Mems',
};

export default async function Home() {
    const allMems = await getAllMems()
    return (
        <div className="text-white"><p>You are on Mems page</p>
            <GoHome/>
            <div className="grid-container">
                {allMems.map((mem, index) => {
                    return (
                        <Card
                            key={`${mem.name}-${index}`}
                            name={mem.name}
                            description={mem.description}
                            imgSrc={mem.image}
                        />
                    );
                })}
                <FooterLogout/>
                <Footer/>
            </div>
        </div>
    );
}
