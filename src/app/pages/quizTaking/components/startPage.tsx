"use client"
import useReviewerStore from "@/app/store/reviewerStore"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


import Navbar from "@/components/ui/quizNavbar"



export default function StartPage({ setIsStart,  }: {setIsStart: (isStart: boolean) => void })
{
   
    const start = () => {
        setIsStart(false)
    }

    return(

        <div className="">
            <Navbar />
            <div className="w-full h-dvh   ">
                
                <div className="w-5/6 m-auto">
                    <Button 
                        className="w-full"
                        onClick={start}
                    >
                        Start Quiz
                    </Button>
                </div>
              
               
            </div>
          
        </div>
    )

}