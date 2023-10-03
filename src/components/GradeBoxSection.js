import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

function GradeBoxSection({section, sectionTitle, totalPossibleScoreInSection, rubricSection}) {
    const [totalScored, setTotalScored] = useState(0)
    const totalScore = () => {
        let total = 0;
        for(let key in section){
            total += section[key]
        }
        setTotalScored(total)
    }

    useEffect(() => {
      totalScore()
    }, [section])
    
    const renderCriteria = () =>{
        return(
            <div className='gradeBox'>
                {Object.keys(section).map(criteria =>{
                    if(!section[criteria]){
                        return <p className= {sectionTitle.split(' ').join('') +' groupCopy'} key= {criteria}>* {criteria}</p>
                    }else{
                        let currentRubricQuestion = rubricSection.questions.find((question)=>{
                            let found = question.options ? question.options.find((option)=> option.description === criteria) : [];
                            return found ? question : undefined
                        })
                        let isHighestPossible = true;
                        for(let option of currentRubricQuestion.options){
                            if(option.score > section[criteria]){
                                isHighestPossible = false;
                            }
                        }
                        if(!isHighestPossible){
                        return <p className= {sectionTitle.split(' ').join('') +' groupCopy'} key= {criteria}>* {criteria}</p>
                        }
                    }
                        
                        
                    }
                )}
            </div>
        )
    }

    const copyText = () => {
        const className = sectionTitle.split(' ').join('')
        const arrOfCriteria = document.querySelectorAll(`.${className}.groupCopy`)
        let fullCopy = '';
        for(let element of arrOfCriteria){
            fullCopy += element.innerText + '\n'
        }
        navigator.clipboard.writeText(fullCopy)
    }

  return (
    <div>
        <h3>{sectionTitle}  {totalScored}/{totalPossibleScoreInSection}</h3>
        {renderCriteria()}
        <Button onClick={copyText}>Copy to Clipboard</Button>
    </div>
  )
}

export default GradeBoxSection