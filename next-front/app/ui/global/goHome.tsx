import Link from 'next/link'


export default function GoHome() {

    return (
        <Link className="go-home-circle" href="/" passHref>
    <div
>
    <img
        src={"/main/go-to-main.jpg"}
    alt="go-home"
    className="circle-image"
        />
        </div>
        </Link>
);
}