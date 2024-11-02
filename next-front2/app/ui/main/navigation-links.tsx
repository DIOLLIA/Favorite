'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

export const links = [
    {name: 'Games', href: '/games'},
    {name: 'Movies', href: '/movies'},
    {name: 'Music', href: '/music'},
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                    >
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
/*
className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
{'bg-sky-100 text-blue-600': pathname === link.href,},
)}*/
