'use client'

import { signOut } from 'next-auth/react';

export default function LogOut() {
    return (
        <button
            onClick={() => signOut({ redirectTo: '/' })}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
            <div>Log Out</div>
        </button>
    );
}