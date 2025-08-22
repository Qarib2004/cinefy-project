import { NO_INDEX_PAGE } from "@/constants/seo.constant";
import { Metadata } from "next";
import Genres from "./Genre";






export const metadata:Metadata = {
    title:'Genre',
    ...NO_INDEX_PAGE
}



export default function GenresPage(){
    return <Genres />
}