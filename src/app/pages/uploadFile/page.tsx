"use client"

import { useState, useRef } from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import useReviewerStore from "@/app/store/reviewerStore"
import type { reviewerInterface } from "@/app/interface/reviewer"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, X, FileText, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const setReviewer = useReviewerStore((state) => state.setReviewer)
  const router = useRouter()
  const fileInput = useRef<HTMLInputElement>(null)

  const mutation = useMutation({
    mutationFn: (formData: FormData) => axios.post("http://localhost:1000", formData),
    onSuccess: (response) => {
      const QnA: reviewerInterface[] = response.data
      setReviewer(QnA)
      router.push("/pages/edit")
    },
    onError: (err) => {
      alert("error")
      console.log(err)
    },
  })

  const upload = () => {
    if (!file) return alert("Please select a file first")
    const formData = new FormData()
    formData.append("file", file)
    mutation.mutate(formData)
  }

  const removeFile = () => {
    if (!fileInput.current) return alert("error")
    fileInput.current.value = ""
    setFile(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
              <span>PDF Reviewer</span>
            </CardTitle>
            <CardDescription>Upload your PDF file to generate a personalized reviewer</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <input
              ref={fileInput}
              id="pdf"
              type="file"
              accept="application/pdf"
              className="hidden"
              required
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />

            <Button
              onClick={() => fileInput.current?.click()}
              variant="outline"
              className="border-2 border-dashed border-slate-300 hover:border-primary w-full h-40 flex flex-col gap-3 transition-all duration-300 hover:bg-slate-50"
            >
              <Heart className="h-16 w-16 text-rose-500 stroke-[1.5px] transition-all duration-300 hover:fill-rose-100" />
              <span className="text-lg font-bold">Click to upload file</span>
              <span className="text-xs text-slate-500">PDF files only</span>
            </Button>

            {file && (
              <div className="bg-slate-100 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="h-5 w-5 flex-shrink-0 text-slate-700" />
                  <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile} className="text-slate-500 hover:text-rose-500">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            )}

            {mutation.isPending && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Generating reviewer...</span>
                  <span>Please wait</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button onClick={upload} className="w-full font-medium" disabled={!file || mutation.isPending}>
              {mutation.isPending ? "Processing..." : "Generate Reviewer"}
              {!mutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Your PDF will be analyzed to create a personalized reviewer with key concepts and questions.</p>
        </div>
      </div>
    </div>
  )
}



