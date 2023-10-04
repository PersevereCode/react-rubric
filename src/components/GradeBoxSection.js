import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

function GradeBoxSection({section, 
                          sectionTitle, 
                          totalPossibleScoreInSection, 
                          rubricSection}) {
    const [totalScored, setTotalScored] = useState(0)
    const totalScore = () => {
        let total = 0;
        for(let key in section){
            if(!Number.isNaN(section[key])){
                total += section[key]
            }
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
                    console.log(section)
                    if(!section[criteria] && sectionTitle !== 'Academic Integrity'){
                        return <p className= {sectionTitle.split(' ').join('') +' groupCopy'} key= {criteria}>* {criteria}</p>
                    }else if(Number.isNaN(section[criteria])){
                        return <p className= {sectionTitle.split(' ').join('') +' groupCopy'} key= {criteria}>* {criteria}</p>
                    }else{
                        //find likert question in rubric
                        let currentRubricQuestion = rubricSection.questions.find((question)=>{
                            if(question.options){
                                for(let option of question.options){
                                    if(option.description === criteria){
                                        return true
                                    }
                                }
                            }
                        })
                        // check if score is highest possible
                        if(currentRubricQuestion){
                            let isHighestPossible = true;
                            for(let option of currentRubricQuestion.options){
                                if(option.score > section[criteria]){
                                    isHighestPossible = false;
                                }
                            }
                            // if score is not highest log note in the grade section
                            if(!isHighestPossible){
                            return <p className= {sectionTitle.split(' ').join('') +' groupCopy'} key= {criteria}>* {criteria}</p>
                            }
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