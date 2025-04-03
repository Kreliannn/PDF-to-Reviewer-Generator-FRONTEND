"use client"
import {useState, useRef} from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import useReviewerStore from "@/app/store/reviewerStore"
import { reviewerInterface } from "@/app/interface/reviewer"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Divide, Upload, X } from "lucide-react"


export default function QuizUploadPage()
{
    const [file, setFile] = useState<FileList | null>(null)
    const [fileContent, setFileContent] = useState<string>("")

    console.log(file)

    const setReviewer = useReviewerStore((state) => state.setReviewer)

    const router = useRouter()

    const fileInput = useRef<HTMLInputElement>(null)

   

    const filePreview = () => {
        if(file)
        {
            let a;
            let reader = new FileReader();
            reader.onload = (e) => {
                let arr = JSON.parse((e.target?.result)?.toString() as string)
                console.log(arr)
                
            };
            reader.readAsText(file[0]); 
        }
    }

    const removeFile = () => {
       setFile(null)
    }

    const upload = () => {
       
        
    }

    
    


    return(
        <div className="w-full">

            <h1 className="text-center w-5/6 md:w-3/6 m-auto text-3xl font-bold mt-5"> Reviwer</h1>
            <p className="text-center w-5/6 md:w-3/6 m-auto text-md  text-stone-400 mt-2"> upload your reviewer file here </p>
            <input 
              ref={fileInput}
              id="txt" 
              type="file"
              accept=".txt" 
              className="hidden" 
              required 
              multiple={true}
              onChange={(e) => {
                setFile((e.target.files) ? e.target.files : null)
                if(file) filePreview()
              }}
             />

             <br />

            <Button onClick={() => fileInput.current?.click()} variant="outline" className="border-2 border-dashed  w-5/6 md:w-3/6 m-auto h-32 flex flex-col gap-2">
                <Upload className="h-24 w-24" />
                <span className="text-lg font-bold">Click to upload file</span>
                <span className="text-xs text-stone-500">pdf file only</span>
            </Button>

            {
                (file) ? 
                <>
                    <div  className="w-5/6 md:w-3/6 m-auto mt-2 flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm truncate mr-4"> {file[0].name}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeFile()} className="hover:text-red-500">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                        </Button>
                    </div>

                    <div className="w-5/6 md:w-3/6 m-auto mt-2   p-3 bg-muted rounded-lg h-72">
                        <h1 className="mb-1"> Preview </h1>
                        <div className="container m-auto overflow-auto rounded-lg h-60 bg-stone-200">
                            {fileContent}
                        </div>
                    </div>
                </>
                   
                : null
            }


            <br />

            
            <Button onClick={upload} className="block w-5/6 md:w-3/6 m-auto" disabled={!file}> Generate Reviewer </Button>
            
            <div className="w-5/6 md:w-3/6 m-auto">
              <p className="w-5/6  m-auto text-center text-md  text-stone-400 mt-4 text-xs"> Your PDF file will be analyzed to create a reviewer with key concepts and question that you can personalized </p>
            </div>
            
            
        </div>
    )
} 

