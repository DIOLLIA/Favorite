import Link from 'next/link'
import Image from "next/image";

export default function GoHome() {

    return (
        <Link className="base-circle go-home-circle" href="/" passHref>
            <div>
                <Image
                    src={"/main/go-to-main.jpg"}
                    alt="go-home"
                    className="circle-image"
                    fill sizes="100vw"
                />
            </div>
        </Link>
    );
}