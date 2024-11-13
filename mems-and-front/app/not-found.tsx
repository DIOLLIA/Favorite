'use client'

import GoHome from "@/app/ui/global/goHome";
import Image from "next/image";
import Footer from "@/app/ui/global/footer";
import Link from "next/link";
import { useRedirectToExternalWithPopUp, PopupNotification } from "@/app/utils";

const geraraHereHref = "https://www.youtube.com/watch?v=Z3QFODsyUnY"

export default function NotFound() {
    const {showPopup, handleLinkClick, confirmRedirect, declineRedirect} = useRedirectToExternalWithPopUp(geraraHereHref)

    return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
            <h2 className="text-xl font-semibold text-white">404 Not Found</h2>
            <Image src={"/main/svali.jpg"}
                   alt="what are you doing here"
                   width={"350"}
                   height={"350"}
            />
            <Link href={geraraHereHref} onClick={handleLinkClick}>
            <Image src={"/main/svali2.jpg"}
                   alt="gerara here man!"
                   width={"400"}
                   height={"400"}
            />
            </Link>
            {showPopup && <PopupNotification onConfirm={confirmRedirect} onDecline={declineRedirect}/>}
            <GoHome/>
            <Footer/>
        </div>
    );
}