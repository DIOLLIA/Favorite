'use client'
import Link from 'next/link'
import {useState} from 'react'
import Image from "next/image";

export default function FloatingCircle() {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href="/mems" passHref>
            <div
                className={`base-circle floating-mem-circle ${hovered ? "hovered" : ""}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Image
                    width= "100"
                    height="100"
                    src={hovered ? "/mems/catHovered.jpg" : "/mems/catNonHover.jpg"}
                    alt="Memes"
                    className="circle-image"
                />
            </div>
        </Link>
    );
}