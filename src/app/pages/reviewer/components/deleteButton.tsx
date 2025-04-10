"use client"
import { Button } from "@/components/ui/button";
import {Trash} from "lucide-react";

export default function DeleteButton({ id } : { id : string})
{
    const deleteReviewer = () => {
        
    }

    return(
        <Button size="icon" variant={"destructive"} className="" >
            <Trash />
           
        </Button>
    )
}