
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



export default function FilterQuestion({ quiz  } : { quiz : reviewerInterface[], }) 
{

    return(
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="black"> Filter Question </Button>
      </DrawerTrigger>
      <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle> Filter Question</DrawerTitle>
            <DrawerDescription>check question of your choice </DrawerDescription>
          </DrawerHeader>

          <div className="h-auto  max-h-72 md:max-h-62 p-4 pb-0 flex flex-wrap items-start gap-2 overflow-auto">
            {
                quiz?.map((item, index) => {
                    return (
                        <div>
                            
                        </div>
                    )
                })
            }
          </div>

          <div className="w-full m-auto  flex justify-center">
             <Button variant="black" className="w-full m-auto"> Apply Changes </Button>
          </div>
       
          
          
          <DrawerFooter className="w-full">
            <DrawerClose asChild className="w-full">
              <Button variant="black" className="w-full">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>     
      </DrawerContent>
    </Drawer>
    )

}