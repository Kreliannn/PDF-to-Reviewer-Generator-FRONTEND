"use client"
import {useState, useRef} from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import useReviewerStore from "@/app/store/reviewerStore"
import { reviewerInterface } from "@/app/interface/reviewer"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Divide, Upload, X } from "lucide-react"

export default function UploadPage()
{
    const [file, setFile] = useState<File | null>(null)

    console.log(file)

    const setReviewer = useReviewerStore((state) => state.setReviewer)

    const router = useRouter()

    const fileInput = useRef<HTMLInputElement>(null)

    const mutation = useMutation({
        mutationFn : (formData : FormData) => axios.post("http://localhost:1000", formData),
        onSuccess : (response) => {
            const  QnA : reviewerInterface[]  = response.data
            setReviewer(QnA)
            router.push("/pages/edit")
        },
        onError : (err) => {
            alert("error")
            console.log(err)
        }
    })

    const upload = () => {
        if(!file) return alert("select file")
        const formData = new FormData()
        formData.append("file", file)
        mutation.mutate(formData)
    }

    const removeFile = () => {
        if(!fileInput.current) return alert("error")
        fileInput.current.value = ""
        setFile(null)
    }

    return(
        <div className="w-full">

            <input 
              ref={fileInput}
              id="pdf" 
              type="file"
              accept="application/pdf" 
              className="hidden" 
              required 
              onChange={(e) => setFile((e.target.files) ? e.target.files[0] : null)}
             />

             <br />

            <Button onClick={() => fileInput.current?.click()} variant="outline" className="border-2 border-dashed  w-5/6 md:w-3/6 m-auto h-32 flex flex-col gap-2">
                <Upload className="h-24 w-24" />
                <span className="text-lg font-bold">Click to upload file</span>
                <span className="text-xs text-stone-800">pdf file only</span>
            </Button>

            {(file) ? 
                <div className=" w-5/6 md:w-3/6 m-auto mt-2 flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm truncate mr-4">{file.name}</span>
                    <Button variant="ghost" size="icon" onClick={removeFile}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                    </Button>
                </div >
            : null}

            <br />

            
            <Button onClick={upload} className="block w-5/6 md:w-3/6 m-auto"> Upload </Button>
            
            
        </div>
    )
} 

/*
"use client"

import * as React from "react"
import Upload from "@mui/icons-material/Upload"
import Clear from "@mui/icons-material/Clear" 
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  accept?: string
}

export function FileUpload({ onFileSelect, accept = "image/*,application/pdf" }: FileUploadProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      onFileSelect?.(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <input ref={inputRef} type="file" accept={accept} onChange={handleFileInput} className="hidden" />

      <Button onClick={() => inputRef.current?.click()} variant="outline" className="w-full h-20 flex flex-col gap-2">
        <Upload className="h-6 w-6" />
        <span className="text-sm">Click to upload file</span>
      </Button>

      {file && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm truncate mr-4">{file.name}</span>
          <Button variant="ghost" size="icon" onClick={removeFile}>
            <Clear className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  )
}
*/
