'use client'
import {useRouter} from "next/navigation";
import "@/app/css/uploadImage.css"

export default function RedirectButton(){
    const router = useRouter()

    return (
        <button onClick={() => router.push("/mems/upload")}
                className="auth-button">
            <div>Upload Image</div>
        </button>
    )
}