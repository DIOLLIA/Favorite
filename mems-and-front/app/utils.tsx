import {useState} from "react";

//hook that returns #1#2 and set (do we need to display pop-up, manage click and redirect)
export function useRedirectToExternalWithPopUp(externalLink: string) {
    const [showPopup, setShowPopup] = useState(false);
    const [confirmedRedirect, setConfirmedRedirect] = useState(false);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault() // no immediate ref
        setShowPopup(true)
    };
    const confirmRedirect = () => {
        setConfirmedRedirect(true)
        setShowPopup(false)
    }
    const declineRedirect = () => {
        setConfirmedRedirect(false)
        setShowPopup(false)
    }

    if (confirmedRedirect) {
        setConfirmedRedirect(false)
        window.open(externalLink, "_blank", "noopener,noreferrer")
    }

    return {showPopup, handleLinkClick, confirmRedirect, declineRedirect};
}

export function PopupNotification({onConfirm, onDecline}: {onConfirm: () => void, onDecline: () => void }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg text-center">
                <p className="text-black">You will be redirected to the external website</p>
                <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">OK</button>
                <button onClick={onDecline} className="bg-gray-300 text-black px-4 py-2 rounded">OMG PLS DON'T</button>
            </div>
        </div>
    );
}