import Link from 'next/link'

//todo change img to next/Image
export default function GoHome() {

    return (
        <Link className="base-circle go-home-circle" href="/" passHref>
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