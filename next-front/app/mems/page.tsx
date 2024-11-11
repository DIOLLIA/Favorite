import {Metadata} from "next";
import {getAllMems} from "@/lib/data";
import {Card} from "@/app/mems/memCard";
import Footer from "@/app/ui/global/footer";

export const metadata: Metadata = {
    title: 'Mems',
};

//todo make navBar and replace <p>  current page
export default async function Home() {
    const allMems = await getAllMems()
    return (
        <div><p>You are on Mems page</p>
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
