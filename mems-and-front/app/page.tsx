import {Metadata} from "next";
import HomePage from "@/app/home/homePage";

export const metadata: Metadata = {
    title: 'DIOLLIA',
};

export default function Page() {
    return <HomePage/>;
}