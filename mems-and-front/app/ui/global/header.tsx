'use client'
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import clsx from "clsx"; // conditionally apply css

interface FooterProps {
    uniqueId: string,
    name: string,
    href: string,
}

function NavFooterLinks(props: FooterProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const lang = searchParams.get('lang') || 'en';
    const hrefWithLang = `${props.href}${props.href.includes('?') ? '&' : '?'}lang=${lang}`;

    return (
        <Link key={props.uniqueId}
              href={hrefWithLang}
              className={clsx('text-white',
                  {'text-yellow-500': pathname === props.href},
              )}>
            <div
                className="w-full h-full relative header-neon-border flex items-center justify-center header-neon-border">
                <p className="hidden md:block">{props.name}</p>
            </div>
        </Link>
    )
}

const headerNavBarLinks = [
    {uniqueId: 'Games', name: 'Games', href: '/games'},
    {uniqueId: 'Movie', name: 'Movie', href: '/movies?limit=3&offset=0'},
    {uniqueId: 'Music', name: 'Music', href: '/music'}
]

export default function Header() {
    return (
        <div className="header grid grid-cols-3">
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