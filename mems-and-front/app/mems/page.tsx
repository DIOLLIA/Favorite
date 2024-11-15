import {Metadata} from "next";
import {getAllMems} from "@/lib/data";
import {Card} from "@/app/mems/memCard";
import Footer from "@/app/ui/global/footer";
import GoHome from "@/app/ui/global/goHome";
import RedirectButton from "@/app/mems/redirectButton";

export const metadata: Metadata = {
    title: 'Mems',
};

export default async function Home() {
    const allMems = await getAllMems()
    return (
        <div className="text-white"><p>You are on Mems page</p>
            <RedirectButton/>
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
                <Footer/>
            </div>
        </div>
    );
}
