"use client"
import useReviewerStore from "@/app/store/reviewerStore"
import { useState } from "react"



export default function Edit()
{
    const reviewer = useReviewerStore((state) => state.reviewer)
    const [QnA, setQnA] = useState(reviewer)

    const changeTitle = (e : React.ChangeEvent<HTMLInputElement>, index : number) => {
        let currentQnA = [...QnA]
        currentQnA[index] = { item : e.target.value, definition : currentQnA[index].definition }
        setQnA(currentQnA)
    }

    const changeDefinition = (e : React.ChangeEvent<HTMLTextAreaElement>, index : number) => {
        let currentQnA = [...QnA]
        currentQnA[index] = { definition : e.target.value, item : currentQnA[index].item }
        setQnA(currentQnA)
    }

    console.log(QnA)

    return(
        <div>
            {
                 QnA?.map((question, index) => {
                    return (
                        <div key={index} className="w-full h-auto  m-auto sahdow-lg mb-10">
                            <input 
                             type="text" 
                             value={question.item}
                             className="w-full text-lg font-bold mb-2 input" 
                             onChange={(e) => changeTitle(e, index)}
                            /> 
                            <br />
                            <textarea 
                             value={question.definition} 
                             className="w-full"
                             onChange={(e) => changeDefinition(e, index)}
                             ></textarea>
                        </div>
                    )
                 })
            }
        </div>
    )
}