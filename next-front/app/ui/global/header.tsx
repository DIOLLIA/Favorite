'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx"; // conditionally apply css

interface FooterProps {
    uniqueId: string,
    name: string,
    href: string,
}

function NavFooterLinks(props: FooterProps) {
    const pathname = usePathname();
    return (
        <Link key={props.uniqueId}
              href={props.href}
              className={clsx('text-white',
                  {'text-yellow-500': pathname === props.href},
              )}>
            <div className="w-full h-full relative header-neon-border flex items-center justify-center header-neon-border">
                <p className="hidden md:block">{props.name}</p>
            </div>
        </Link>
    )
}

const headerNavBarLinks = [
    {uniqueId: 'Games', name: 'Games', href: '/games'},
    {uniqueId: 'Movie', name: 'Movie', href: '/movies'},
    {uniqueId: 'Music', name: 'Music', href: '/music'}
]

export default function Header() {
    return (
        <div className="grid grid-cols-3 text-white tracking-wider">
            {
                headerNavBarLinks.map(link => (
                        <NavFooterLinks
                            key={link.name}
                            uniqueId={link.uniqueId}
                            name={link.name}
                            href={link.href}
                        />
                        ))}
                    </div>
                )
            }