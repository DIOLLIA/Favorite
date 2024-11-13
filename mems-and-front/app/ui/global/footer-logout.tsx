'use server'

import LogOut from "@/app/ui/global/logout";

export default async function FooterLogout() {
    return (
        <div>
            <footer className="circle-image">
                <LogOut/>
            </footer>
        </div>
    )
}