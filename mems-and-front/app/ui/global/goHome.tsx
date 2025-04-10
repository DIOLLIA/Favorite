import Link from 'next/link'

export default function GoHome() {

    return (
        <Link className="base-circle go-home-circle" href="/" passHref>
            <div>
                <img
                    src={"/mainPage/go-to-main.jpg"}
                    alt="go-home"
                    className="circle-image"
                />
            </div>
        </Link>
    );
}