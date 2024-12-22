'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
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
    const currentPage = Math.ceil(offset / limit) + 1;

    const createPageURL = (page: number) => {
        const newOffset = page - 1;
        const params = new URLSearchParams({ limit: limit.toString(), offset: newOffset.toString() });
        if (searchParams.get('lang')) {
            params.set('lang', searchParams.get('lang')!); // Добавляем текущую локаль
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
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm border',
        {
            'z-10 bg-blue-600 border-blue-600 text-white': isActive,
            'hover:bg-gray-100': !isActive,
        }
    );

    return (
        <Link href={href} className={className}>
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
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled,
        }
    );

    const icon =
        direction === 'left' ? (
            <ArrowLeftIcon className="w-4" />
        ) : (
            <ArrowRightIcon className="w-4" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}