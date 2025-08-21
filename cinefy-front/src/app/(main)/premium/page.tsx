import { NO_INDEX_PAGE } from "@/constants/seo.constant";
import { Metadata } from "next";
import Premium from "./Premium";










export const metadata:Metadata = {
    title:'Premium subscription',
    ...NO_INDEX_PAGE
}



export default function PremiumPage() {
	return <Premium />
}