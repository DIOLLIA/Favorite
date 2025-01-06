'use client';

import clsx from 'clsx';
import Link from 'next/link';
import {useSearchParams} from "next/navigation";

export default function Pagination({
                                       limit,
                                       offset,
                                       totalCount,
                                       pathname,
                                   }: {
    limit: number;
    offset: number;
    totalCount: number;
    pathname: string;
}) {
    const searchParams = useSearchParams()
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = offset  + 1;

    const createPageURL = (page: number) => {
        const newOffset = page - 1;
        const params = new URLSearchParams({ limit: limit.toString(), offset: newOffset.toString() });
        if (searchParams.get('lang')) {
            params.set('lang', searchParams.get('lang')!);
        }
        return `${pathname}?${params.toString()}`;
    };

    const generatePages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const allPages = generatePages();

    return (
        <div className="inline-flex">
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
                {allPages.map((page) => (
                    <PaginationNumber
                        key={page}
                        href={createPageURL(page)}
                        page={page}
                        isActive={currentPage === page}
                    />
                ))}
            </div>

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
}

function PaginationNumber({
                              page,
                              href,
                              isActive,
                          }: {
    page: number;
    href: string;
    isActive: boolean;
}) {
    const numberClass = clsx(
        'number',
        {
            'hover:neon-border active-page ': isActive,
            'neon-border': !isActive,
        }
    );

    return (
        <Link href={href} className={numberClass}>
            {page}
        </Link>
    );
}

function PaginationArrow({
                             href,
                             direction,
                             isDisabled,
                         }: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}) {
    const arrowClass = clsx(
        'arrow',
        {
            'arrow-disabled': isDisabled,
            'arrow-left': direction === 'left',
            'arrow-right': direction === 'right',
        }
    );

    return isDisabled ? (
        <div className={arrowClass} />
    ) : (
        <Link className={arrowClass} href={href} />
    );
}