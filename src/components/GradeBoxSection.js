import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

function GradeBoxSection({section, sectionTitle, totalPossibleScoreInSection}) {
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
                        return <p key= {criteria}>* {criteria}</p>
                    }else if(section[criteria] ){
                        
                    }
                })}
            </div>
        )
    }

    const copyText = () =>{

    }
  return (
    <div>
        <h3>{sectionTitle}  {totalScored}/{totalPossibleScoreInSection}</h3>
        {renderCriteria()}
        <Button>Copy to Clipboard</Button>
    </div>
  )
}

export default GradeBoxSection