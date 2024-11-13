import Image from "next/image";
import "@/app/css/memCard.css"

interface CardProps {
    name: string;
    description: string;
    imgSrc: string;
}

export function Card({ name, description, imgSrc }: CardProps) {
    return (
        <div className="card">
            <div className="card-image">
                <Image
                    src={imgSrc}
                    alt={name}
                    width={200}
                    height={200}
                    className="image-fill"
                />
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}