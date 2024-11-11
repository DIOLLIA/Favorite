'use client'
import Link from 'next/link'
import {useState} from 'react'

export default function FloatingCircle() {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href="/mems" passHref>
            <div
                className={`floating-mem-circle ${hovered ? "hovered" : ""}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img
                    src={hovered ? "/mems/catHovered.jpg" : "/mems/catNonHover.jpg"}
                    alt="Memes"
                    className="circle-image"
                />
            </div>
        </Link>
    );
}