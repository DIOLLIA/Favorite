import {signOut} from "@/app/api/auth/auth";

export default function LogOut() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({redirectTo: "/mems"});
            }}
        >
            <button
                className="auth-button">
                <div>Log Out</div>
            </button>
        </form>
    );
}