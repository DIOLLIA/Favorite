'use server'

import LogOut from "@/app/ui/global/logout";

export default async function FooterLogout() {
    return (
        <div>
            <header>
                <LogOut/>
            </header>
        </div>
    )
}