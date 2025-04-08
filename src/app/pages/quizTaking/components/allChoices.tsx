
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash, X } from "lucide-react";
import { reviewerInterface } from "@/app/interface/reviewer"
import Navbar from "@/components/ui/quizNavbar"
import { Send } from 'lucide-react';
import { Badge } from "@/components/ui/badge"


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"



export default function AllChoices({ quiz, setInput, input, submit } : 
  { 
    quiz : reviewerInterface[],
     setInput : React.Dispatch<React.SetStateAction<string>>, 
     input : String,
     submit : () => void
  } 
)
{

  const [answer, setAnswer] = useState<string>("")  

  const submitAnswer =() => {

  }

    return(
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="black" size="lg"> Choices </Button>
      </DrawerTrigger>
      <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle> Choices</DrawerTitle>
            <DrawerDescription>you can click the answer.</DrawerDescription>
          </DrawerHeader>
          <div className="h-auto  max-h-72 md:max-h-62 p-4 pb-0 flex flex-wrap items-start gap-2 overflow-auto">
            {
                quiz?.map((item, index) => {
                    return (
                        <Badge 
                         variant={(input != item.item)? "outline" : "default"}
                         key={index}
                         onClick={() => setInput(item.item)}
                        > 
                            {item.item} 
                        </Badge >
                    )
                })
            }  

          </div>

          <div className="w-full m-auto  flex justify-center p-4 mt-2">
             <Button variant="black" className="w-full m-auto" onClick={submit}> <Send /> Submit Answer </Button>
          </div>

        </div>     
      </DrawerContent>
    </Drawer>
    )

}